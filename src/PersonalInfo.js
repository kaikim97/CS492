import "./PersonalInfo.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import api from "./api";

export default function PersonalInfo() {
  const data = api.getAllReservations().then((response) => {
    console.log(response.data);
  });

  const data2 = api.getAllHalls().then((response) => {
    console.log(response.data);
  });
  //name, phone, title, date, time, seats
  const createReservation = api
    .createReservation({
      name: "SeokHwan",
      phone: "01051995990",
      title: "Eternals",
      date: "211115",
      time: "1300",
      seats: ["F11", "F12"],
    })
    .then((response) => {
      console.log(response);
    });

  const [time, setTime] = useState("1230");
  const [seat, setSeat] = useState(["F11", "F12"]);
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [done, setDone] = useState(false);

  const handleChange = (event) => {
    switch (event.target.id) {
      case "phone":
        setPhone(event.target.value);
        break;
      case "pwd":
        setPwd(event.target.value);

        break;
      case "pwdConfirm":
        setPwdConfirm(event.target.value);
        break;
      default:
        return;
    }
  };

  const handleConfirm = () => {
    if (pwd === pwdConfirm) {
      console.log("예약이 완료되었습니다.");
      setDone(true);
    } else {
      console.log("비밀번호가 일치하지 않습니다.");
    }
  };

  const parseTime = (time) => {
    const temp = time.slice(0, 2) + ":" + time.slice(2);
    return temp;
  };

  return done ? (
    <div>
      <p>{phone}님의 예약이 완료되었습니다.</p>
      <p>시간: {parseTime(time)}</p>
      <p>좌석: {seat.join(", ")}</p>
      <Button
        style={{
          margin: "2vh 0",
          backgroundColor: "lightGray",
          fontSize: "16px",
          width: "6vw",
        }}
      >
        돌아가기
      </Button>
    </div>
  ) : (
    <div>
      <h3>예약 내역을 확인하고 개인정보를 입력해 주세요.</h3>

      <div id="check">
        <h3>예약확인</h3>
        <p>시간: {parseTime(time)}</p>
        <p>좌석: {seat.join(", ")}</p>
      </div>

      <div id="enterInfo">
        <h3 className="subtitle">개인정보 입력</h3>
        <div className="textfield">
          <h4 className="subtitle">휴대폰 번호</h4>
          <TextField
            id="phone"
            value={phone}
            onChange={handleChange}
            inputProps={{ maxLength: 11 }}
            size="small"
          />
        </div>
        <div className="textfield">
          <h4 className="subtitle">비밀번호(숫자 4자리)</h4>
          <TextField
            id="pwd"
            type="password"
            value={pwd}
            onChange={handleChange}
            inputProps={{ maxLength: 4 }}
            size="small"
          />
        </div>
        <div className="textfield">
          <h4 className="subtitle">비밀번호 확인</h4>
          <TextField
            id="pwdConfirm"
            type="password"
            value={pwdConfirm}
            onChange={handleChange}
            inputProps={{ maxLength: 4 }}
            size="small"
          />
        </div>
      </div>

      <div id="buttons">
        <Button
          disabled={
            phone.length < 10 || pwd.length !== 4 || pwdConfirm.length !== 4
          }
          onClick={handleConfirm}
          color="info"
          style={{
            backgroundColor: "lightGray",
            margin: "0 2vw",
            fontSize: "16px",
            width: "6vw",
          }}
        >
          확인
        </Button>
        <Button
          style={{
            backgroundColor: "lightGray",
            margin: "0 2vw",
            fontSize: "16px",
            width: "6vw",
          }}
        >
          돌아가기
        </Button>
      </div>
    </div>
  );
}
