import * as React from 'react';
import './Date.css';
import { useSelector, useDispatch } from 'react-redux';
import { setCalendarShown } from '../redux/generalSlice';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export default function Date({day}) {
  const calendarShown = useSelector((state) => state.general.calendarShown);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCalendarShown(!calendarShown));
  };

  return (
    <div id="homepage-date-fieldset-container">
      <fieldset id="homepage-date-fieldset" onClick={handleClick}>
        <legend id="homepage-date-fieldset-legend">Date</legend>
        {day}
        <CalendarTodayIcon />
      </fieldset>
    </div>
  );
}