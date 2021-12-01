import React, { useRef, useEffect, useContext, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { AuthContext } from "../../context.js";
import seatData from "./seats-kaist.json";
import { useNavigate } from "react-router-dom";
import api from "../../api";

function Seat() {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const seatMap = seatData.map;
  const seatInfo = seatData.seats;

  const [selectedSeat, setSeat] = useState([]);
  const [totalPrice, setPrice] = useState(0);

  const goNext = () => {
    ctx.setSeats(selectedSeat);
    ctx.setPrice(totalPrice);
    const createReservation = api
      .createReservation({
        title: ctx.title,
        date: ctx.date,
        time: ctx.time.time,
        seats: selectedSeat,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          ctx.setId(response.data._id);
          navigate("/personalInfo");
        } else {
          // TODO: 이후 별도 창으로 띄워야함
          console.log("이미 선택된 좌석입니다");
        }
      });
  };

  const getPrice = (row) => {
    const num = row.charCodeAt(0) - 65;
    var price;
    if (num <= 5) {
      price = 9000;
    } else if (num <= 11) {
      price = 10000;
    } else {
      price = 11000;
    }
    return price;
  };

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
              var rownum = (seat.lefttop.y - 11) / 30 + 65;
              var row = String.fromCharCode(rownum);
              var col = (seat.lefttop.x - 17) / 30 + 1;
              const seatNum = row + String(col);
              if (seat.available) {
                context.fillStyle = "grey";
                seat.available = false;
                setSeat((selectedSeat) => selectedSeat.concat(seatNum));
                setPrice((totalPrice) => totalPrice + getPrice(row));
              } else {
                context.fillStyle = seatgroup.color;
                seat.available = true;
                setSeat((selectedSeat) =>
                  selectedSeat.filter((s) => s !== seatNum)
                );
                setPrice((totalPrice) => totalPrice - getPrice(row));
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

  return (
    <div class="flex flex-col">
      <div class="self-center pt-52">
        <TransformWrapper doubleClick={{ disabled: true }} maxScale={3}>
          <TransformComponent>
            <div>
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
      <div class="">
        <div class="text-xl text-center">
          <b>선택된 좌석 &nbsp;&nbsp;&nbsp; 가격</b>
        </div>
        {selectedSeat.map((seat, index) => (
          <div class="text-center" key={index}>
            {seat} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {getPrice(seat[0])}원
          </div>
        ))}
        <div class="text-xl text-center">
          <b>총 &nbsp;&nbsp;&nbsp; {totalPrice}원</b>
        </div>
      </div>
      <div class="">
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
}

export default Seat;
