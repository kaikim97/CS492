// import "./PersonalInfo.css";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import api from "./api";
import { AuthContext } from "./context.js";
import CustomButton from "./library/CustomButton";
import { useNavigate } from "react-router-dom";

export default function PersonalInfo() {
  const navigate = useNavigate();

  const context = useContext(AuthContext);

  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [done, setDone] = useState(false);
  const [open, setOpen] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [id, setId] = useState("");

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
          console.log(response.data);
        });
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

  const parseTime = (time) => {
    const time_change =
      time.slice(0, 2) * 1 > 12 ? time.slice(0, 2) * 1 - 12 + ":00" : time;
    const amPm = time.slice(0, 2) * 1 >= 12 ? "PM" : "AM";
    return time_change + amPm;
  };
  function goHome() {
    navigate("/");
  }
  return done ? (
    <div>
      <Modal open={open}>
        <div class="overflow-y-scroll outline-none bg-white rounded-2xl text-gray-500 m-auto mt-8vh mb-12vh w-10/12 sm:w-6/12 h-80vh">
          <div class="h-40p px-4vw pt-8vh ">
            <div class="px-2vw flex flex-col justify-between h-5/6 mb-3vh">
              <div class="text-title font-bold ">{context.title}</div>

              <div class="text-datetime font-semibold  flex w-10/12 xl:w-1/2 justify-between">
                <p> {parseDate(context.date)}</p>
                <p> {parseTime(context.time)}</p>
              </div>
              <div class="  flex w-full justify-between">
                <p class="text-seat font-semibold ">
                  {context.seats.join(", ")}
                </p>
                <p class="text-price font-medium ">
                  {parseInt(context.price / 1000) + ",000"}원
                </p>
              </div>
            </div>
            <hr class="w-full  m-auto " />
          </div>

          <div class="h-45p relative px-4vw py-2vh ">
            <div class="text-seat font-medium flex flex-col h-35p justify-between my-2vh px-2vw ">
              <p>예약이 완료되었습니다.</p>
              <p>예약번호 &nbsp;&nbsp;&nbsp;&nbsp; {context.id}</p>
            </div>
          </div>
          <div class="w-full h-15p">
            <div class="text-smallletter text-center w-85p m-auto  font-semibold text-gray-400 mb-1p">
              예약 조회는 ‘예약 번호로 조회' 또는 ‘생년월일과 휴대폰 번호로
              조회' 모두 가능합니다
            </div>
            <div class="w-full text-center m-auto">
              <CustomButton
                name="돌아가기"
                disabled={buttonDisabled}
                onClick={goHome}
                width="w-85p "
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  ) : (
    <div>
      <Modal open={open}>
        <div class="overflow-y-scroll outline-none bg-white rounded-2xl text-gray-500 m-auto mt-8vh mb-12vh w-7/12 sm:w-6/12 h-80vh">
          <div class="h-40p px-4vw pt-8vh ">
            <div class="px-2vw flex flex-col justify-between h-5/6 mb-3vh">
              <div class="text-title font-bold ">{context.title}</div>

              <div class="text-datetime font-semibold  flex w-10/12 xl:w-1/2 justify-between">
                <p> {parseDate(context.date)}</p>
                <p> {parseTime(context.time)}</p>
              </div>
              <div class="  flex w-full justify-between">
                <p class="text-seat font-semibold ">
                  {context.seats.join(", ")}
                </p>
                <p class="text-price font-medium ">
                  {parseInt(context.price / 1000) + ",000"}원
                </p>
              </div>
            </div>
            <hr class="w-full  m-auto " />
          </div>

          <div class="h-45p relative px-4vw py-4vh ">
            <div class="text-label font-semibold flex flex-col h-80p  justify-between my-2vh px-2vw ">
              <div class="flex w-full items-center justify-between ">
                <p class="">생년월일(6자리)</p>
                <TextField
                  id="birthday"
                  placeholder="980918"
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
              <div class="flex w-full items-center justify-between ">
                <p class="">휴대폰 번호</p>
                <TextField
                  id="phone"
                  placeholder="01000000000"
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
              <div class="flex w-full items-center justify-between ">
                <p class="">비밀번호(4자리)</p>
                <TextField
                  id="pwd"
                  placeholder="0000"
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
              <div class="flex w-full items-center justify-between ">
                <p class="">비밀번호 확인</p>
                <TextField
                  id="pwdConfirm"
                  placeholder="0000"
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
          <div class="w-full h-15p text-center m-auto ">
            <div class="text-smallletter w-85p m-auto  font-semibold text-gray-400 mb-1p">
              예약 내역이 맞으시면 생년월일과 휴대폰 번호, 비밀번호를 입력 한 후
              결제를 완료해주세요
            </div>
            <div class="w-full m-auto">
              <CustomButton
                name="결제하기"
                disabled={buttonDisabled}
                onClick={handleConfirm}
                width="w-85p "
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
