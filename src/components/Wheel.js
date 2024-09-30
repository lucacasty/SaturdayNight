import React from 'react';
import WheelComponent from './WheelComponent';

export default function () {

  let objIndex = {
    "Iphone13promax": 1, 
    "Bosesurroundspeakers": 2, 
    "Samsung65-InchCrystalUHD4KFlatSmartTV": 3, 
    "MacBookAirMGN6314”Display,AppleM1ChipWith8-Core": 4, 
    "KIATELLURIDE2022": 5,
    "SAMSUNGFRONTLOADWASHINGMACHINE16KG": 6,
    "10GRAMSGOLDCOIN": 7,
  }
  const segments = [
    "Ale",
    "Gullo",  
    "Luca ",
    "Luisa",
    "Andre",
    "Dutto",
    "Abra",
  ];

  const weelColors = () => {
    let arr = [];
    let colors = ["#EF476F", "#FFD166", "#06D6A0", "#118AB2", "#073B4C", "#8F6593", "#EDAF97"];
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