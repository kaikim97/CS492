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
import Ticket from "./library/Ticket";

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
    if (
      phone.length >= 10 &&
      pwd.length == 4 &&
      pwdConfirm.length == 4 &&
      pwd == pwdConfirm
    ) {
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

  function goHome() {
    navigate("/");
  }
  return done ? (
    <div>
      <Modal open={open}>
        <div class="overflow-y-scroll outline-none bg-white rounded-2xl text-gray-500 m-auto mt-8vh mb-12vh w-10/12 sm:w-6/12 h-80vh">
          <div class="h-40p px-4vw pt-8vh ">
            <Ticket
              title={context.title}
              date={context.date}
              time={context.time.substring(0, 2) + context.time.substring(3, 5)}
              seats={context.seats}
              price={context.price}
            />
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
            <Ticket
              title={context.title}
              date={context.date}
              time={context.time.substring(0, 2) + context.time.substring(3, 5)}
              seats={context.seats}
              price={context.price}
            />
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

          <p
            class={`text-smallletter font-medium  text-center ${
              pwd.length == 4 && pwdConfirm.length == 4 && pwd !== pwdConfirm
                ? "text-red-600"
                : "text-white"
            }`}
          >
            {" "}
            비밀번호가 일치하지 않습니다. 비밀번호를 확인해주세요
          </p>

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
