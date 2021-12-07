import React, { useRef, useEffect, useContext, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { AuthContext } from "../../context.js";
import seatData from "./seats-kaist.json";
import { useNavigate } from "react-router-dom";
import apis from "../../api";
import CustomButton from "../../library/CustomButton.js";

function Seat() {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const seatMap = seatData.map;
  const seatInfo = seatData.seats;

  seatInfo.forEach((seatgroup) => {
    console.log(seatgroup.color, seatgroup.price);
  });

  const [selectedSeat, setSeat] = useState([]);
  const [totalPrice, setPrice] = useState(0);

  const makeTimeNum = (time) => {
    return time.split(":").join("");
  };

  const goNext = () => {
    ctx.setSeats(selectedSeat);
    ctx.setPrice(totalPrice);
    console.log(ctx.title, ctx.date, makeTimeNum(ctx.time), selectedSeat);

    const createReservation = apis
      .preoccupySeat({
        title: ctx.title,
        date: ctx.date,
        time: makeTimeNum(ctx.time),
        seats: selectedSeat,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          ctx.setId(response.data._id);
          console.log("예약하기");
          navigate("/personalInfo");
        } else {
          // TODO: 이후 별도 창으로 띄워야함
          console.log("이미 선택된 좌석입니다");
        }
      });
  };

  // const getPrice = (row) => {
  //   const num = row.charCodeAt(0) - 65;
  //   var price;
  //   if (num <= 5) {
  //     price = 9000;
  //   } else if (num <= 11) {
  //     price = 10000;
  //   } else {
  //     price = 11000;
  //   }
  //   return price;
  // };

  // Draw seats
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    setSeat((selectedSeat) => []);
    setPrice(0);

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
              var rownum = (seat.lefttop.y - 11) / 30 + 65;
              var row = String.fromCharCode(rownum);
              var col = (seat.lefttop.x - 17) / 30 + 1;
              const seatNum = row + String(col);
              if (seat.available) {
                context.fillStyle = "#3C68D8";
                context.strokeStyle = "#3C68D8";
                seat.available = false;
                setSeat((selectedSeat) => selectedSeat.concat(seatNum));
                // setPrice((totalPrice) => totalPrice + getPrice(row));
                setPrice((totalPrice) => totalPrice + seatgroup.price);
              } else {
                context.fillStyle = seatgroup.color;
                context.strokeStyle = seatgroup.color;
                seat.available = true;
                setSeat((selectedSeat) =>
                  selectedSeat.filter((s) => s !== seatNum)
                );
                // setPrice((totalPrice) => totalPrice - getPrice(row));
                setPrice((totalPrice) => totalPrice - seatgroup.price);
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
    <div class=" flex flex-col h-full overflow-scroll">
      <div class=" flex items-center flex-auto flex-shrink-0 my-2p">
        <div class="text-sm font-medium ml-2vh   text-gray-500 flex-initial flex xl:block">
          {seatInfo.map((seatgroup) => (
            <div class="flex mb-1">
              <div
                class={`  w-5 h-5  rounded-sm flex-initial mr-5 ${
                  seatgroup.name == "R" ? "bg-R" : ""
                } ${seatgroup.name == "S" ? "bg-S" : ""} ${
                  seatgroup.name == "A" ? "bg-A" : ""
                }`}
              ></div>
              <div class="flex-initial mr-6">{seatgroup.name}석</div>
              <div class="flex-initial mr-8">
                {parseInt(seatgroup.price / 1000) + ",000"}원
              </div>
            </div>
          ))}
        </div>
      </div>
      <div class="w-full flex-auto my-2p items-center ml-10  overflow-scroll ">
        {/* h-70p my-2p xl:my-4p */}
        <TransformWrapper
          doubleClick={{ disabled: true }}
          maxScale={3}
          minScale={0.9}
        >
          <TransformComponent>
            <div class="">
              <canvas
                id="seats"
                ref={canvasRef}
                // width="1000"
                // height="800"
                width={window.innerWidth}
                height={window.innerHeight}
                // width={seatMap.size.width}
                // height={seatMap.size.height}
                color={seatMap.background}
                // class="object-cover"
              ></canvas>
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
      <div class=" w-full flex-auto py-2p flex-shrink-0 flex-grow-0 flex  ">
        <div class="w-97/100  mx-auto  py-1p h-full flex  bg-white font-bold rounded-lg items-center">
          <div class="text-md md:text-xl text-left text-gray-500 w-4/12  overflow-x-scroll flex ml-10 mr-10 flex-initial">
            {selectedSeat.map((seat) => (
              <div>
                <div class="mr-2 align-middle">{seat}</div>
              </div>
            ))}
          </div>
          <div
            class={`text-md md:text-xl flex-auto flex  ${
              totalPrice == 0 ? " text-white" : "text-gray-500 "
            }`}
          >
            {parseInt(totalPrice / 1000) + ",000"}원
          </div>

          {/* <button
            class={`w-40 h-full py-1p text-sm md:text-lg font-bold rounded-lg flex-initial mr-5 ${
              selectedSeat.length != 0
                ? "bg-gray-200 text-gray-500"
                : "bg-gray-100 text-gray-200"
            } `}
            type="submit"
            onClick={goNext}
            disabled={selectedSeat.length == 0}
          >
            예약하기
          </button> */}
          <CustomButton
            name="예약하기"
            disabled={selectedSeat.length == 0}
            onClick={goNext}
            width="w-40 "
          />
        </div>
      </div>
    </div>
  );
}

export default Seat;
