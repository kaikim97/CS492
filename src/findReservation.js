import { useState } from "react";
import api from "./api";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomButton from "./library/CustomButton";
// import "./FindReservation.css";
import Ticket from "./library/Ticket";

export default function FindReservation() {
  const navigate = useNavigate();
  const [resNum, setResNum] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

  // const temp = api.getAllReservations().then((response) => {
  //   console.log(response.data);
  // });

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
      console.log("data", response.data);
      console.log(response.data == "");
      setOpen(true);
      if (response.data != "") {
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

  const clear = () => {
    setOpen(false);
    setData(null);
  };

  function goHome() {
    navigate("/");
  }
  function goBack() {
    setOpen(false);
    setResNum("");
  }
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
      {data == null ? (
        <Modal open={open}>
          <div class="overflow-y-scroll bg-white rounded-2xl text-gray-500 m-auto mt-20vh mb-15vh w-7/12 sm:w-6/12 h-65vh">
            <div class="h-28p px-6vw pt-12vh font-semibold text-letter">
              <p>예약 내역이 없습니다.</p>
            </div>

            <div class="h-20p mt-10p w-full text-center m-auto place-items-center">
              <CustomButton
                name="다시 조회하기"
                disabled={false}
                onClick={goBack}
                width="w-85p"
              />
            </div>
          </div>
        </Modal>
      ) : (
        <Modal open={open}>
          <div class="overflow-y-scroll bg-white rounded-2xl text-gray-500 m-auto mt-20vh mb-15vh w-7/12 sm:w-6/12 h-65vh">
            <div class="h-28p px-6vw pt-12vh font-semibold text-letter">
              {phone == "" && (
                <p>
                  예약번호 &nbsp;&nbsp;{data._id}&nbsp;&nbsp; 의 예약
                  내역입니다.
                </p>
              )}
              {phone != "" && (
                <p>
                  휴대폰 번호 &nbsp;&nbsp;{phone.substring(0, 3)}-
                  {phone.substring(3, 7)}-{phone.substring(7, 11)}&nbsp;&nbsp;
                  의 예약 내역입니다.
                </p>
              )}
            </div>
            <div class="h-42p px-4vw  ">
              <hr class="w-full  m-auto mb-3vh" />
              <Ticket
                title={data.title}
                date={data.date}
                time={data.time}
                seats={data.seats}
                price={data.price}
              />
              <hr class="w-full  m-auto " />
            </div>
            <div class="h-20p mt-10p w-full text-center m-auto place-items-center">
              <CustomButton
                name="예약으로 돌아가기"
                disabled={false}
                onClick={goHome}
                width="w-85p"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
