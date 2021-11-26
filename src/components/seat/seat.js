import React, { useRef, useEffect, useContext, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { AuthContext } from "../../context.js";
import seatData from "./seats-kaist.json";
import "./seat.css";
import { useNavigate } from "react-router-dom";

function Seat() {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const seatMap = seatData.map;
  const seatInfo = seatData.seats;

  const [selectedSeat, setSeat] = useState([]);

  // Draw seats
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (seatInfo != "undefined" && seatInfo != null) {
      seatInfo.forEach((seatgroup) => {
        seatgroup.rectangles.forEach((seat) => {
          // Add Seat availablity & id info
          seat.available = true;
          context.fillStyle = seatgroup.color;
          context.fillRect(
            seat.lefttop.x,
            seat.lefttop.y,
            seat.size.width,
            seat.size.height
          );
        });
      });
    }
  }, []);

  // Manage click event
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.addEventListener(
      "click",
      function (e) {
        // Get x, y coordinates
        var x = e.offsetX;
        var y = e.offsetY;
        seatInfo.forEach((seatgroup) => {
          seatgroup.rectangles.forEach((seat) => {
            // Detect a selected seat
            if (
              seat.lefttop.x < x &&
              seat.lefttop.x + seat.size.width > x &&
              seat.lefttop.y < y &&
              seat.lefttop.y + seat.size.height > y
            ) {
              e.preventDefault();
              // Make a seatNumber
              // format : "Alphabet + Number" ex) "A10"
              // Alphabet : A ~ S
              // Number   : 1 ~ 29
              var rownum = (seat.lefttop.y - 11) / 30;
              var row = String.fromCharCode(rownum + 65);
              var col = (seat.lefttop.x - 17) / 30 + 1;
              const seatNum = row + String(col);
              if (seat.available) {
                context.fillStyle = "grey";
                seat.available = false;
                setSeat((selectedSeat) => selectedSeat.concat(seatNum));
              } else {
                context.fillStyle = seatgroup.color;
                seat.available = true;
                setSeat((selectedSeat) =>
                  selectedSeat.filter((s) => s !== seatNum)
                );
              }
              context.fillRect(
                seat.lefttop.x,
                seat.lefttop.y,
                seat.size.width,
                seat.size.height
              );
            }
          });
        });
      },
      false
    );
  }, []);

  useEffect(() => {
    console.log(selectedSeat);
  }, [selectedSeat]);

  return (
    <div>
      <div>
        <TransformWrapper doubleClick={{ disabled: true }} maxScale={3}>
          <TransformComponent>
            <div className="seat-layout">
              <canvas
                ref={canvasRef}
                width={seatMap.size.width}
                height={seatMap.size.height}
                color={seatMap.background}
              ></canvas>
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
      <div>
        {selectedSeat.length != 0 && (
          <button
            class="w-60 py-3 text-lg rounded-lg bg-gray-200 text-gray-500 absolute right-7 bottom-7"
            type="submit"
            onClick={goNext}
          >
            다음
          </button>
        )}
      </div>
    </div>
  );

  function goNext() {
    ctx.setSeats(selectedSeat);
    navigate("/personalInfo");
  }
}

export default Seat;
