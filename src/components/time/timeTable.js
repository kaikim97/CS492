import React, { useState } from 'react';
import './time.css';

const times = [
  { time : '10:00', seat : 30},
  { time : '11:00', seat : 67},
  { time : '12:00', seat : 44},
  { time : '14:00', seat : 16},
  { time : '16:00', seat : 24},
  { time : '18:00', seat : 98},
  { time : '20:00', seat : 29},
  { time : '21:00', seat : 41}
];

const TimeTable = ({ times = [] }) => (
  <div className="time_tbl">
    <table className="kbo">
      <tbody>
        {times.map(section => <TimeRow key={section.time} section={section} />)}
      </tbody>
    </table>
  </div>
);


const TimeRow = ({ section }) => {
  const [isShown, setIsShown] = useState(false);
  const { time, seat } = section
  const seatWithTotal = seat + "/343"
  return (
    <tr>
      <td className = "firstCol" >
        <span onMouseOver={mouseOverTime} onMouseOut={mouseOutTime}>{changeTimeForm(time)}
        <span className="ampm">{amOrPm(time)}</span></span>
      </td>
      <td ><span className = "seat">{isShown && seatWithTotal}</span></td>
    </tr>
  )
  function mouseOverTime(e){
    console.log(e.target.parentElement)
    
    if (e.target.parentElement.className = "firstCol"){
      e.target.parentElement.style.background = '#ececec';
      setIsShown(true)
    }
  }

  function mouseOutTime(e){
    if (e.target.parentElement.className = "firstCol"){
      e.target.parentElement.style.background = "white";
      setIsShown(false)
    }
  }
}


function changeTimeForm( time ) {
  if (time.slice(0, 2) * 1 > 12){
    return time.slice(0, 2) * 1 - 12 + ":00"
  }else{
    return time
  }
}

function amOrPm( time ) {
  if (time.slice(0, 2) * 1 >= 12){
    return "PM"
  }else{
    return "AM"
  }
}

export default () => <TimeTable times={times} />
