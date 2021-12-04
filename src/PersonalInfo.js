import "./PersonalInfo.css";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import api from "./api";
import { AuthContext } from "./context.js";

export default function PersonalInfo(props) {
  // const data = api.getAllReservations().then((response) => {
  //   console.log(response.data);
  // });

  const context = useContext(AuthContext);

  // const [date, setDate] = useState("20211201");
  // const [title, setTitle] = useState("Dune");
  // const [time, setTime] = useState("2200");
  // const [seat, setSeat] = useState(["F16", "F17"]);
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [done, setDone] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [id, setId] = useState("");

  const { open, setClose } = props;

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
      const updateReservation = api
        .updateReservationById(context.id, {
          birth: birthday,
          phone: phone,
          password: pwd,
          price: context.price,
        })
        .then((response) => {
          if (response) {
            // console.log(response.data);
            console.log("예약이 완료되었습니다.");
            setDone(true);
          }
        })
        .catch((error) => {
          alert("예약 시간 초과");
          window.location.href = "/movieInfo";
        });
    } else {
      console.log("비밀번호가 일치하지 않습니다.");
    }
  };

  const parseDate = (date) => {
    const temp =
      date.slice(0, 4) + "," + date.slice(4, 6) + "," + date.slice(6);

    const dateString = new Date(temp);
    const dayInt = dateString.getDay();

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

  const changeTimeForm = (time) => {
    if (time.slice(0, 2) * 1 > 12) {
      return time.slice(0, 2) * 1 - 12 + ":00";
    } else {
      return time;
    }
  };

  const parseTime = (time) => {
    const amPm = time.slice(0, 2) * 1 >= 12 ? "PM" : "AM";
    const temp = changeTimeForm(time) + amPm;
    return temp;
  };

  return done ? (
    <div>
      <Modal open={open}>
        <div id="modalRoot">
          <div id="firstHalf">
            <div id="title">{context.title}</div>

            <div id="dateTime">
              <p> {parseDate(context.date)}</p>
              <p> {parseTime(context.time.time)}</p>
            </div>
            <div id="seatPrice">
              <p>{context.seats.join(", ")}</p>
              <p>{context.price}원</p>
            </div>
          </div>
          <hr className="solid" />
          <div id="bottomHalf">
            <p className="subtitle">예약이 완료되었습니다.</p>
            <p className="subtitle">
              예약번호 &nbsp;&nbsp;&nbsp;&nbsp; {context.id}
            </p>
          </div>

          <div
            style={{
              width: "85%",
              marginTop: "20vh",
              marginLeft: "7.5%",
              marginBottom: "1.5vh",
              textAlign: "center",
              fontSize: "min(1vw, 1.6vh)",
            }}
          >
            예약 조회는 ‘예약 번호로 조회' 또는 ‘생년월일과 휴대폰 번호로 조회'
            모두 가능합니다
          </div>
          <div id="payButton">
            <Button
              style={{
                backgroundColor: "lightGray",
                fontSize: "min(2.8vh, 1.7vw)",
                color: "white",
                width: "85%",
              }}
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                돌아가기
              </Link>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  ) : (
    <div>
      <Modal open={open}>
        <div id="modalRoot" class="relative h-32 w-32">
          <button
            class="w-30 py-3 text-lg rounded-lg bg-gray-100 text-gray-500 absolute top-0 right-0 h-16 w-16"
            type="submit"
            onClick={setClose}
          >
            X
          </button>
          <div id="firstHalf">
            <div id="title">{context.title}</div>

            <div id="dateTime">
              <p> {parseDate(context.date)}</p>
              <p> {parseTime(context.time.time)}</p>
            </div>
            <div id="seatPrice">
              <p>{context.seats.join(", ")}</p>
              <p>{context.price}원</p>
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
