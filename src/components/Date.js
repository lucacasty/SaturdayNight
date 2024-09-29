import * as React from 'react';
import './Date.css';
import { useSelector, useDispatch } from 'react-redux';

export default function Date() {
  let selectedDay = useSelector((state) => state.general.selectedDay);

  const handleClick = (event, param) => {
    console.log(event);
    console.log(param);
  };

  return (
    <div id="homepage-date-fieldset-container">
      <fieldset id="homepage-date-fieldset" onClick={event => handleClick(event, 'hello world')}>
        <legend id="homepage-date-fieldset-legend">Date</legend>
        {selectedDay}
      </fieldset>
    </div>
  );
}