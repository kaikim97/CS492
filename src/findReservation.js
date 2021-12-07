import { useState } from "react";
import api from "./api";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button, Modal } from "@mui/material";
// import "./FindReservation.css";

export default function FindReservation() {
  const [resNum, setResNum] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

  const temp = api.getAllReservations().then((response) => {
    console.log(response.data);
  });

  const handleChange = (event) => {
    switch (event.target.id) {
      case "birth":
        setBirth(event.target.value);
        break;
      case "phone":
        setPhone(event.target.value);
        break;
      case "pwd":
        setPwd(event.target.value);
        break;
      case "resNum":
        setResNum(event.target.value);
        break;
      default:
        return;
    }
  };

  const resNumClick = () => {
    const data = api.getReservationById(resNum).then((response) => {
      console.log(response.data);
      if (response.data) {
        setOpen(true);
        setData(response.data);
      }
    });
  };

  const resQuery = () => {
    const queryString = new URLSearchParams({
      birth: birth,
      phone: phone,
      password: pwd,
    });
    const data = api.getReservationQuery(queryString).then((response) => {
      console.log(response.data);
      if (response.data) {
        setData(response.data[0]);
        setOpen(true);
      }
    });
  };

  const parseDate = (date) => {
    const temp =
      date.slice(0, 4) + "," + date.slice(4, 6) + "," + date.slice(6);

    const dateString = new Date(temp);
    const dayInt = dateString.getDay();
    console.log(dayInt);

    const dayString =
      dayInt == 0
        ? "일"
        : dayInt == 1
        ? "월"
        : dayInt == 2
        ? "화"
        : dayInt == 3
        ? "수"
        : dayInt == 4
        ? "목"
        : dayInt == 5
        ? "금"
        : "토";

    console.log(dayString);

    const result =
      date.slice(0, 4) +
      "." +
      date.slice(4, 6) +
      "." +
      date.slice(6) +
      "(" +
      dayString +
      ")";

    return result;
  };

  const parseTime = (time) => {
    const amPm = time > 1200 ? "PM" : "AM";
    const temp = time.slice(0, 2) + ":" + time.slice(2) + amPm;
    return temp;
  };

  const clear = () => {
    setOpen(false);
    setData(null);
  };

  return (
    <div class="text-gray-600">
      <div class="mt-8vh text-bigletter font-bold text-center">예약 조회</div>
      <div class="mx-28vw text-left mt-12vh mb-8vh">
        <p class="text-letter mb-2vh font-semibold">예약 번호로 조회하기</p>
        <div class="flex justify-between">
          <TextField
            id="resNum"
            onChange={handleChange}
            value={resNum}
            style={{ width: "80%" }}
            fullWidth
            placeholder="예약번호"
          />
          <Button onClick={resNumClick} class="bg-gray-200 w-19p">
            조회
          </Button>
        </div>
      </div>

      <div class="mx-28vw text-left ">
        <p class="text-letter mb-2vh font-semibold">
          이름과 휴대폰번호로 조회하기
        </p>
        <div class="w-80p flex justify-between mb-1vh">
          <TextField
            id="birth"
            onChange={handleChange}
            value={birth}
            style={{ width: "37%" }}
            placeholder="생년월일(6자리)"
          />
          <TextField
            id="phone"
            onChange={handleChange}
            value={phone}
            style={{ width: "60%" }}
            placeholder="휴대폰 번호"
          />
        </div>
        <div class="flex justify-between">
          <TextField
            id="pwd"
            onChange={handleChange}
            value={pwd}
            style={{ width: "80%" }}
            placeholder="비밀번호(4자리)"
          />
          <Button onClick={resQuery} class="bg-gray-200 w-19p">
            조회
          </Button>
        </div>
      </div>
      {data == null ? null : (
        <Modal open={open}>
          <div class="overflow-y-scroll bg-white rounded-2xl text-gray-500 m-auto mt-20vh mb-15vh w-7/12 sm:w-6/12 h-65vh">
            <div class="h-28p px-6vw pt-12vh font-semibold text-letter">
              <p>
                예약번호 &nbsp;&nbsp;{data._id}&nbsp;&nbsp; 의 예약 내역입니다.
              </p>
            </div>
            <div class="h-42p px-4vw  ">
              <hr class="w-full  m-auto mb-3vh" />
              <div class="px-2vw flex flex-col justify-between h-5/6 mb-3vh">
                <div class="text-title font-bold ">{data.title}</div>

                <div class="text-datetime font-semibold  flex w-10/12 xl:w-1/2 justify-between">
                  <p> {parseDate(data.date)}</p>
                  <p> {parseTime(data.time)}</p>
                </div>
                <div class=" flex w-full justify-between">
                  <p class="text-seat font-semibold ">
                    {data.seats.join(", ")}
                  </p>
                  <p class="text-price font-medium ">
                    {parseInt(data.price / 1000) + ",000"}원
                  </p>
                </div>
              </div>
              <hr class="w-full  m-auto " />
            </div>
            <div class="h-30p text-center m-auto grid place-items-center">
              <Button class="w-85p text-center py-1p rounded-lg text-seat font-bold bg-gray-200 text-gray-500">
                <Link to="/" style={{ textDecoration: "none" }}>
                  예약으로 돌아가기
                </Link>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
