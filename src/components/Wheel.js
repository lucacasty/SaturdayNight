import React from 'react';
import { Wheel } from 'wheel-of-react';

export default function () {

  return(
    <>
      <Wheel
        wheelData={
          [
            {color: 'black', text: "Test 1"},
            {color: 'white', text: "Test 2"},
            {color: 'green', text: "Test 3"},
            {color: 'blue', text: "Test 4"},
            {color: 'red', text: "Test 5"},
            {color: 'yellow', text: "Test 6"}
          ]
        }
        fontFamily='Roboto'
      />
    </>
  )
}