import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';


const BottomNavigator = () => {

  const [value, setValue] = React.useState(0);

  return (
    <>
    <Box style={{position: 'absolute', bottom: '0', width: '100%'}}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction icon={<DonutSmallIcon />} />
        <BottomNavigationAction icon={<GroupsRoundedIcon />} />
        <BottomNavigationAction icon={<CalendarMonthIcon />} />
        <BottomNavigationAction icon={<DescriptionRoundedIcon />} />
        <BottomNavigationAction icon={<PersonRoundedIcon />} />
      </BottomNavigation>
    </Box>
    </>
  );
}
  
  export default BottomNavigator;