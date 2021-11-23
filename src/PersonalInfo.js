import "./PersonalInfo.css";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import api from "./api";

export default function PersonalInfo() {
  const data = api.getAllReservations().then((response) => {
    console.log(response.data);
  });

  const data2 = api.getAllHalls().then((response) => {
    console.log(response.data);
  });
  //name, phone, title, date, time, seats

  const [date, setDate] = useState("20211103");
  const [title, setTitle] = useState("듄");
  const [time, setTime] = useState("1230");
  const [seat, setSeat] = useState(["F11", "F12"]);
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [done, setDone] = useState(false);
  const [open, setOpen] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (phone.length >= 10 && pwd.length == 4 && pwdConfirm.length == 4) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [phone, pwd, pwdConfirm]);

  const handleChange = (event) => {
    switch (event.target.id) {
      case "birthday":
        setBirthday(event.target.value);
        break;
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
      <Modal open={open}>
        <div id="modalRoot">
          <div id="firstHalf">
            <div id="title">{title}</div>

            <div id="dateTime">
              <p> {parseDate(date)}</p>
              <p> {parseTime(time)}</p>
            </div>
            <div id="seatPrice">
              <p>{seat.join(", ")}</p>
              <p>198,000원</p>
            </div>
          </div>
          <hr className="solid" />

          <div id="bottomHalf">
            <div id="enterInfo">
              <div className="textfield">
                <p className="subtitle">생년월일(6자리)</p>
                <TextField
                  id="birthday"
                  value={birthday}
                  onChange={handleChange}
                  inputProps={{ maxLength: 11, style: { marginLeft: "1vw" } }}
                  InputProps={{
                    style: { fontSize: "min(1.4vw, 2.3vh)" },
                  }}
                  variant="standard"
                  style={{ width: "60%" }}
                />
              </div>
              <div className="textfield">
                <p className="subtitle">휴대폰 번호</p>
                <TextField
                  id="phone"
                  value={phone}
                  onChange={handleChange}
                  inputProps={{ maxLength: 11, style: { marginLeft: "1vw" } }}
                  InputProps={{
                    style: { fontSize: "min(1.4vw, 2.3vh)" },
                  }}
                  variant="standard"
                  style={{ width: "60%" }}
                />
              </div>
              <div className="textfield">
                <p className="subtitle">비밀번호(4자리)</p>
                <TextField
                  id="pwd"
                  type="password"
                  value={pwd}
                  onChange={handleChange}
                  inputProps={{ maxLength: 11, style: { marginLeft: "1vw" } }}
                  InputProps={{
                    style: { fontSize: "min(1.4vw, 2.3vh)" },
                  }}
                  variant="standard"
                  style={{ width: "60%" }}
                />
              </div>
              <div className="textfield">
                <p className="subtitle">비밀번호 확인</p>
                <TextField
                  id="pwdConfirm"
                  type="password"
                  value={pwdConfirm}
                  onChange={handleChange}
                  inputProps={{ maxLength: 11, style: { marginLeft: "1vw" } }}
                  InputProps={{
                    style: { fontSize: "min(1.4vw, 2.3vh)" },
                  }}
                  variant="standard"
                  style={{ width: "60%" }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              width: "85%",
              marginLeft: "7.5%",
              marginBottom: "1.5vh",
              textAlign: "center",
              fontSize: "min(1vw, 1.6vh)",
            }}
          >
            예약 내역이 맞으시면 생년월일과 휴대폰 번호, 비밀번호를 입력 한 후
            결제를 완료해주세요
          </div>
          <div id="payButton">
            <Button
              disabled={buttonDisabled}
              onClick={handleConfirm}
              style={{
                backgroundColor: buttonDisabled ? "lightGray" : "#1899F9",
                fontSize: "min(2.8vh, 1.7vw)",
                color: "white",
                width: "85%",
              }}
            >
              결제하기
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
