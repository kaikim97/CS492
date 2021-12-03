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

    setSeat((selectedSeat) => []);

    if (seatInfo != "undefined" && seatInfo != null) {
      seatInfo.forEach((seatgroup) => {
        seatgroup.rectangles.forEach((seat) => {
          // Add Seat availablity & id info
          seat.available = true;
          context.strokeStyle = seatgroup.color;
          context.fillStyle = seatgroup.color;

          const cornerRadius = 8;
          context.lineJoin = "round";
          context.lineWidth = cornerRadius;
          context.strokeRect(
            seat.lefttop.x + cornerRadius / 2,
            seat.lefttop.y + cornerRadius / 2,
            seat.size.width - cornerRadius,
            seat.size.height - cornerRadius
          );
          context.fillRect(
            seat.lefttop.x + cornerRadius / 2,
            seat.lefttop.y + cornerRadius / 2,
            seat.size.width - cornerRadius,
            seat.size.height - cornerRadius
          );
        });
      });
    }
    for (var i = 0; i < 19; i++) {
      context.font = "bold 12pt Calibri";
      context.fillStyle = "black";
      context.fillText(String.fromCharCode(i + 65), 0, 29 + 30 * i);
    }
    for (var i = 1; i < 30; i++) {
      context.font = "bold 12pt Calibri";
      context.fillStyle = "black";
      context.fillText(String(i), 30 * i - 12, 12);
    }
  }, [ctx.time]);

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
              // Format : "Alphabet + Number" ex) "A10"
              // Alphabet : A ~ S
              // Number   : 1 ~ 29
              var rownum = (seat.lefttop.y - 11) / 30;
              var row = String.fromCharCode(rownum + 65);
              var col = (seat.lefttop.x - 17) / 30 + 1;
              const seatNum = row + String(col);
              if (seat.available) {
                context.fillStyle = "#3C68D8";
                context.strokeStyle = "#3C68D8";
                seat.available = false;
                setSeat((selectedSeat) => selectedSeat.concat(seatNum));
              } else {
                context.fillStyle = seatgroup.color;
                context.strokeStyle = seatgroup.color;
                seat.available = true;
                setSeat((selectedSeat) =>
                  selectedSeat.filter((s) => s !== seatNum)
                );
              }
              const cornerRadius = 8;
              context.lineJoin = "round";
              context.lineWidth = cornerRadius;

              context.strokeRect(
                seat.lefttop.x + cornerRadius / 2,
                seat.lefttop.y + cornerRadius / 2,
                seat.size.width - cornerRadius,
                seat.size.height - cornerRadius
              );
              context.fillRect(
                seat.lefttop.x + cornerRadius / 2,
                seat.lefttop.y + cornerRadius / 2,
                seat.size.width - cornerRadius,
                seat.size.height - cornerRadius
              );
            }
          });
        });
      },
      false
    );
  }, []);

  return (
    <div class="w-full ">
      <div class="self-center pt-14 xl:pt-40">
        <TransformWrapper
          doubleClick={{ disabled: true }}
          maxScale={3}
          minScale={0.5}
        >
          <TransformComponent>
            <div>
              <canvas
                ref={canvasRef}
                // width={window.innerWidth}
                // height={window.innerHeight}
                width={seatMap.size.width}
                height={seatMap.size.height}
                color={seatMap.background}
              ></canvas>
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
      <div class="absolute bottom-5 right-3 w-11/12 xl:w-2/3 h-16 flex bg-white font-bold rounded-lg">
        <div class="text-xl text-left text-gray-500 w-5/12 flex mt-5 ml-10 ">
          {selectedSeat.map((seat) => (
            <div class="mr-2 align-middle">{seat}</div>
          ))}
        </div>
        <div class="text-xl flex-initial text-gray-500 flex mt-5">99000</div>

        <div class="grid place-items-center">
          <button
            class={`w-40 py-2 text-lg font-bold rounded-lg  absolute right-3 ${
              selectedSeat.length != 0
                ? "bg-gray-200 text-gray-500"
                : "bg-gray-100 text-gray-200"
            } `}
            type="submit"
            onClick={goNext}
          >
            예약하기
          </button>
        </div>
      </div>
    </div>
  );

  function goNext() {
    ctx.setSeats(selectedSeat);
    navigate("/personalInfo");
  }
}

export default Seat;
