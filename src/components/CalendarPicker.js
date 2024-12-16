import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { useSelector, useDispatch } from 'react-redux';
import { changeSelectedDay, setCalendarShown } from '../redux/generalSlice';
import { setGroupIdeasInSelectedDay } from '../redux/groupSlice';

export default function CalendarPicker({ ideas }) {

  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1; 
  let day = today.getDate();
  let initialValue = dayjs(`${year}-${month}-${day}`);

  let selectedDay = useSelector((state) => state.general.selectedDay);
  if(selectedDay == null) {
    selectedDay = '';
  }

  const dispatch = useDispatch();
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    getDaysWithIdeas(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, [ideas]);

  const handleMonthChange = (date) => {
    console.log("2:"+date);
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  const handleDaySelection = (date) => {
    let value = date.year() + '-' + ('0'+(date.month()+1)).slice(-2) + '-' + ('0'+date.date()).slice(-2);
    dispatch(changeSelectedDay(value));
    dispatch(setCalendarShown(false));
  };
  
  /**
   * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
   * ⚠️ No IE11 support
   */
  function getDaysWithIdeas(date, { signal }) {
    return new Promise((resolve, reject) => {

      const currentMonth = date.month() + 1; // getMonth() ritorna 0-11, quindi aggiungiamo 1
      const currentYear = date.year();
      
      let daysToHighlight = ideas.filter(item => {
        const [year, month, day] = item.date.split('-').map(Number); // Dividiamo la stringa della data
        return month === currentMonth && year === currentYear;
      });

      dispatch(setGroupIdeasInSelectedDay(daysToHighlight));

      daysToHighlight = daysToHighlight.map(item => parseInt(item.date.split('-')[2]));

      console.log("Day to higlight: "+daysToHighlight);

      resolve({ daysToHighlight });
  
      signal.onabort = () => {
        reject(new DOMException('aborted', 'AbortError'));
      };
    });
  }
  
  function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  
    const isSelected =
      !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
  
    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? '💡' : undefined}
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue} //TODO: update with value selected
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}
        onChange={handleDaySelection}
      />
    </LocalizationProvider>
  );
}