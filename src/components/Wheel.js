import React from 'react';
import WheelComponent from './WheelComponent';

export default function ({ideas}) {

  let segments = [];

  if(ideas !== null && ideas !== undefined && ideas.length > 0) {
    segments = ideas.map(item => item.name);
  }
  else {
    segments = [
      "Ale",
      "Gullo",  
      "Luca ",
      "Lucrezia Isaia",
      "Andre",
      "Dutto",
      "Abra",
    ] 
  }


  const weelColors = () => {
    let arr = [];
    let colors = ["#BB342F", "#C8B82D", "#4F9523", "#06D6A0", "#118AB2", "#974992", "#F26430"];
    segments.forEach((el) => {
      let color = colors.shift();
      arr.push(color);
      colors.push(color);
    });

    return arr;
  };
  const segColors = weelColors();

  const onFinished = (winner) => {
    console.log(winner);
  };

  return(
    <>
      <div id="wheel-container">
        <WheelComponent
          segments={segments}
          segColors={segColors}
          winningSegment={"8"}
          onFinished={(winner) => onFinished(winner)}
          primaryColor="black"
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={true}
        />
      </div>
    </>
  )
}