import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

const BottomNavigator = () => {

  const [value, setValue] = React.useState(0);

  return (
    <>
    <Box sx={{ width: 500 }} style={{position: 'absolute', bottom: '0', width: '100%'}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction icon={<HomeRoundedIcon />} />
        <BottomNavigationAction icon={<GroupsRoundedIcon />} />
        <BottomNavigationAction icon={<AddRoundedIcon />} />
        <BottomNavigationAction icon={<DescriptionRoundedIcon />} />
        <BottomNavigationAction icon={<PersonRoundedIcon />} />
      </BottomNavigation>
    </Box>
    </>
  );
}
  
  export default BottomNavigator;