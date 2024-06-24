import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useSelector, useDispatch } from 'react-redux'
import { changePage } from '../redux/generalSlice'


const BottomNavigator = () => {

  const generalSettings = useSelector((state) => state.general)
  const dispatch = useDispatch()

  return (
    <>
    <Box style={{position: 'absolute', bottom: '0', width: '100%'}}>
      <BottomNavigation
        value={generalSettings.page}
        onChange={(event, newValue) => {
          dispatch(changePage(newValue));
        }}
      >

        <BottomNavigationAction icon={<DonutSmallIcon sx={{ fontSize: 40 }} />} />
        <BottomNavigationAction icon={<GroupsRoundedIcon sx={{ fontSize: 40 }} />} />
        <BottomNavigationAction icon={<CalendarMonthIcon sx={{ fontSize: 40 }} />} />  
        <BottomNavigationAction icon={<DescriptionRoundedIcon sx={{ fontSize: 40 }} />} />
        <BottomNavigationAction icon={<PersonRoundedIcon sx={{ fontSize: 40 }} />} />

      </BottomNavigation>
    </Box>
    </>
  );
}
  
  export default BottomNavigator;