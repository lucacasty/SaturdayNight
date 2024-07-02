import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector, useDispatch } from 'react-redux';
import { changeSelectedGroup } from '../redux/generalSlice';

export default function GroupList({ groups }) {

  const groupSelected = useSelector((state) => state.general.groupSelected);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(changeSelectedGroup(event.target.value));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Group</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={groupSelected}
          label="Group"
          onChange={handleChange}
        >
          {groups.map(group => <MenuItem value={group.id}>{group.name}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}