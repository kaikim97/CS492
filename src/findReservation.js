import { useState } from "react";
import api from "./api";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button, Modal } from "@mui/material";
import "./FindReservation.css";

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
    <div>
      <div id="header">예약 조회</div>
      <div id="upperHalf">
        <p className="label">예약 번호로 조회하기</p>
        <div id="upperTextfield">
          <TextField
            id="resNum"
            onChange={handleChange}
            value={resNum}
            style={{ width: "90%" }}
            fullWidth
            placeholder="예약번호"
          />
          <Button onClick={resNumClick}>조회</Button>
        </div>
      </div>

      <div id="lowerHalf">
        <p className="label">이름과 휴대폰번호로 조회하기</p>
        <div id="fieldRoot">
          <div id="upperLine">
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
          <div id="lowerLine">
            <TextField
              id="pwd"
              onChange={handleChange}
              value={pwd}
              style={{ width: "90%" }}
              placeholder="비밀번호(4자리)"
            />
            <Button onClick={resQuery}>조회</Button>
          </div>
        </div>
      </div>
      {data == null ? null : (
        <Modal open={open}>
          <div id="modalRoot">
            <div id="resInfo">
              <p style={{ fontSize: "" }}>
                예약번호 {data._id}의 예약 내역입니다.
              </p>
            </div>
            <hr className="solid" />
            <div id="resInfo">
              <div id="title">{data.title}</div>
              <div id="dateTime">
                <p> {parseDate(data.date)}</p>
                <p> {parseTime(data.time)}</p>
              </div>
              <div id="seatPrice">
                <p>{data.seats.join(", ")}</p>
              </div>
            </div>
            <hr className="solid" />
            <div id="backButton">
              <Button
                style={{
                  backgroundColor: "lightGray",
                  fontSize: "min(2.8vh, 1.7vw)",
                  color: "white",
                  width: "85%",
                }}
              >
                {" "}
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
