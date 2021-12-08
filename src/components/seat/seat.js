import React, {
  useRef,
  useEffect,
  useContext,
  useState,
  useLayoutEffect,
} from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { AuthContext } from "../../context.js";
import seatData from "./seats-kaist.json";
import { useNavigate } from "react-router-dom";
import apis from "../../api";
import CustomButton from "../../library/CustomButton.js";
import { useSubscription } from "@apollo/client";
import { gql } from "@apollo/client";
import PersonalInfo from "../../PersonalInfo.js";

function Seat() {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const seatMap = seatData.map;
  const seatInfo = seatData.seats;
  const cornerRadius = 8;

  const [realTimeSeat, setRealSeat] = useState([]);
  const [selectedSeat, setSeat] = useState([]);
  const [reservedSeat, modSeat] = useState([]);
  const [upload, setLoad] = useState(false);
  const [totalPrice, setPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

  const resSeatRef = useRef(reservedSeat);
  const realSeatRef = useRef(realTimeSeat);

  const createSubscription = gql`
    subscription subscription {
      reservationUpdated {
        type
        info {
          _id
          title
          date
          time
          seats
        }
      }
    }
  `;
  const { data, loading, error } = useSubscription(createSubscription);

  const closeModal = () => {
    setOpen(false);
    setSeat((selectedSeat) => []);
    setPrice(0);
    apis.deleteReservation(ctx.id).then((response) => {
      if (response) console.log("선택한 좌석이 취소되었습니다");
    });
  };

  const handleEvent = () => {
    if (open) {
      closeModal();
    }
  };

  const goNext = () => {
    ctx.setSeats(selectedSeat.sort());
    ctx.setPrice(totalPrice);

    const createReservation = apis
      .preoccupySeat({
        title: ctx.title,
        date: ctx.date,
        time: ctx.time,
        seats: selectedSeat,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          ctx.setId(response.data._id);
          setOpen(true);
        } else {
          console.log("이미 선택된 좌석입니다");
        }
      });
  };

  const numToCode = (x, y) => {
    var rownum = (y - 11) / 30 + 65;
    var row = String.fromCharCode(rownum);
    var col = (x - 17) / 30 + 1;
    return row + String(col);
  };

  const codeToNum = (seat) => {
    const x = (seat.slice(1) - 1) * 30 + 17;
    const y = (seat.slice(0, 1).charCodeAt(0) - 65) * 30 + 11;
    return [x, y];
  };

  const codeToColor = (code) => {
    const row = code.charCodeAt(0) - 65;
    if (row < 6) return "#86CA67";
    else if (row < 12) return "#F4AB67";
    else return "#DFC66E";
  };

  // Draw seats
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const params = `title=${ctx.title}&date=${ctx.date}&time=${ctx.time}`;
    // Initialize
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    setSeat((selectedSeat) => []);
    setPrice(0);
    setLoad(false);

    apis.getHallsByInfo(params).then((response) => {
      const occupied = response.data.occupied;
      const resSeat = Object.entries(occupied);
      resSeatRef.current = resSeat.map((entrie, idx) => entrie[0]);
      modSeat((reservedSeat) => resSeat);
      setLoad(true);
    });

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
  }, [size, ctx.time]);

  // Draw occupied & reserved seats
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (upload) {
      reservedSeat.forEach((seat) => {
        context.lineJoin = "round";
        context.lineWidth = cornerRadius;
        context.fillStyle = "#808080";
        context.strokeStyle = "#808080";

        const [x, y] = codeToNum(seat[0]);

        context.strokeRect(
          x + cornerRadius / 2,
          y + cornerRadius / 2,
          20 - cornerRadius,
          20 - cornerRadius
        );
        context.fillRect(
          x + cornerRadius / 2,
          y + cornerRadius / 2,
          20 - cornerRadius,
          20 - cornerRadius
        );
      });
    }
  }, [upload]);

  // Draw realtime seats
  useEffect(() => {
    if (!loading) {
      console.log(data.reservationUpdated);
      const realTimeData = data.reservationUpdated;
      if (
        ctx.title === realTimeData.info.title &&
        ctx.date === realTimeData.info.date &&
        ctx.time === realTimeData.info.time
      ) {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const seats = realTimeData.info.seats;

        context.lineJoin = "round";
        context.lineWidth = cornerRadius;
        console.log(realTimeSeat);
        seats.forEach((seat) => {
          const seatColor = codeToColor(seat[0]);
          if (realTimeData.type === "create") {
            context.fillStyle = "#808080";
            context.strokeStyle = "#808080";
            setRealSeat((realTimeSeat) => realTimeSeat.concat(seat));
            console.log(realTimeSeat);
          }
          if (realTimeData.type === "delete") {
            context.fillStyle = seatColor;
            context.strokeStyle = seatColor;
            setRealSeat((realTimeSeat) =>
              realTimeSeat.filter((s) => s !== seat)
            );
          }
          const [x, y] = codeToNum(seat);
          context.strokeRect(
            x + cornerRadius / 2,
            y + cornerRadius / 2,
            20 - cornerRadius,
            20 - cornerRadius
          );
          context.fillRect(
            x + cornerRadius / 2,
            y + cornerRadius / 2,
            20 - cornerRadius,
            20 - cornerRadius
          );
        });
        // console.log(realTimeSeat);
      }
    }
  }, [data]);

  useEffect(() => {
    realSeatRef.current = realTimeSeat;
  }, [realTimeSeat]);

  // Manage click event
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.addEventListener(
      "click",
      function (e) {
        const resSeat = resSeatRef.current;
        const realTimeSeat = realSeatRef.current;
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
              const seatNum = numToCode(seat.lefttop.x, seat.lefttop.y);
              console.log(realTimeSeat);
              if (
                !resSeat.includes(seatNum) &&
                !realTimeSeat.includes(seatNum)
              ) {
                if (seat.available) {
                  context.fillStyle = "#3C68D8";
                  context.strokeStyle = "#3C68D8";
                  seat.available = false;
                  setSeat((selectedSeat) => selectedSeat.concat(seatNum));
                  setPrice((totalPrice) => totalPrice + seatgroup.price);
                } else {
                  context.fillStyle = seatgroup.color;
                  context.strokeStyle = seatgroup.color;
                  seat.available = true;
                  setSeat((selectedSeat) =>
                    selectedSeat.filter((s) => s !== seatNum)
                  );
                  setPrice((totalPrice) => totalPrice - seatgroup.price);
                }
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
            }
          });
        });
      },
      false
    );
  }, []);

  // Delete preoccupied seats when press BACK button
  useEffect(() => {
    window.addEventListener("popstate", handleEvent);
    return () => window.removeEventListener("popstate", handleEvent);
  });

  // Manage canvas size when window is resized
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
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
                width={size[0]}
                height={size[1]}
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
            {selectedSeat.sort().map((seat) => (
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

          <CustomButton
            name="예약하기"
            disabled={selectedSeat.length == 0}
            onClick={goNext}
            width="w-40 "
          />
          <PersonalInfo open={open} setClose={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default Seat;
