import React, { useRef, useEffect, useContext, useState } from "react";
import seatData from "./seats-kaist.json";
import "./seat.css"

function Seat() {
  const canvasRef = useRef(null);
  const seatMap = seatData.map;
  const seatInfo = seatData.seats;

  // count: # of selected seats
  const [count, setcount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    // Draw seats
    if (seatInfo != 'undefined' && seatInfo != null) {
      seatInfo.forEach(seatgroup => {
        seatgroup.rectangles.forEach(seat => {
          // Add Seat availablity & id info
          seat.available = true;
          context.fillStyle = seatgroup.color;
          context.fillRect(seat.lefttop.x, seat.lefttop.y, seat.size.width, seat.size.height);
        });
      });
    }

    canvas.addEventListener('click', function(e) {
    // Get x, y coordinates
      var x = e.layerX;
      var y = e.layerY;
      seatInfo.forEach(seatgroup => {
        seatgroup.rectangles.forEach(seat => {
          // Detect a selected seat
          if (seat.lefttop.x < x && seat.lefttop.x + seat.size.width > x &&
            seat.lefttop.y < y && seat.lefttop.y + seat.size.height > y) {
              e.preventDefault();
              if (seat.available) {
                context.fillStyle = 'grey';
                seat.available = false;
              } else {
                context.fillStyle = seatgroup.color;
                seat.available = true;
              }
              context.fillRect(seat.lefttop.x, seat.lefttop.y, seat.size.width, seat.size.height);
          }
        });
      });
    }, false);
  }, []);

  return (
    <div className="seat-layout">
      <canvas ref={canvasRef} width={seatMap.size.width} height={seatMap.size.height} color={seatMap.background}></canvas>
    </div>
  );
};

export default Seat