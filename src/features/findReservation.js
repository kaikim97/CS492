import { useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomButton from "../library/CustomButton";
import Ticket from "../library/Ticket";

export default function FindReservation() {
  const navigate = useNavigate();
  const [resNum, setResNum] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

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
      setOpen(true);
      if (response.data != "") {
        setData(response.data);
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
    setBirth("");
    setPhone("");
    setPwd("");
  }
  return (
    <div class="text-gray-600">
      <div class="mt-8vh text-bigletter font-bold text-center">์์ฝ ์กฐํ</div>
      <div class="mx-28vw text-left mt-12vh mb-8vh">
        <p class="text-letter mb-2vh font-semibold">์์ฝ ๋ฒํธ๋ก ์กฐํํ๊ธฐ</p>
        <div class="flex justify-between">
          <TextField
            id="resNum"
            onChange={handleChange}
            value={resNum}
            style={{ width: "80%" }}
            fullWidth
            placeholder="์์ฝ๋ฒํธ"
          />
          <Button onClick={resNumClick} class="bg-gray-200 w-19p">
            ์กฐํ
          </Button>
        </div>
      </div>

      <div class="mx-28vw text-left ">
        <p class="text-letter mb-2vh font-semibold">
          ์ด๋ฆ๊ณผ ํด๋ํฐ๋ฒํธ๋ก ์กฐํํ๊ธฐ
        </p>
        <div class="w-80p flex justify-between mb-1vh">
          <TextField
            id="birth"
            onChange={handleChange}
            value={birth}
            style={{ width: "37%" }}
            placeholder="์๋์์ผ(6์๋ฆฌ)"
          />
          <TextField
            id="phone"
            onChange={handleChange}
            value={phone}
            style={{ width: "60%" }}
            placeholder="ํด๋ํฐ ๋ฒํธ"
          />
        </div>
        <div class="flex justify-between">
          <TextField
            id="pwd"
            onChange={handleChange}
            value={pwd}
            style={{ width: "80%" }}
            placeholder="๋น๋ฐ๋ฒํธ(4์๋ฆฌ)"
          />
          <Button onClick={resQuery} class="bg-gray-200 w-19p">
            ์กฐํ
          </Button>
        </div>
      </div>
      {data == null ? (
        <Modal open={open}>
          <div class="overflow-y-scroll bg-white rounded-2xl text-gray-500 m-auto mt-20vh mb-15vh w-7/12 sm:w-6/12 h-65vh">
            <div class="h-28p px-6vw pt-12vh font-semibold text-letter">
              <p>์์ฝ ๋ด์ญ์ด ์์ต๋๋ค.</p>
            </div>

            <div class="h-20p mt-10p w-full text-center m-auto place-items-center">
              <CustomButton
                name="๋ค์ ์กฐํํ๊ธฐ"
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
                  ์์ฝ๋ฒํธ &nbsp;&nbsp;{data._id}&nbsp;&nbsp; ์ ์์ฝ
                  ๋ด์ญ์๋๋ค.
                </p>
              )}
              {phone != "" && (
                <p>
                  ํด๋ํฐ ๋ฒํธ &nbsp;&nbsp;{phone.substring(0, 3)}-
                  {phone.substring(3, 7)}-{phone.substring(7, 11)}&nbsp;&nbsp;
                  ์ ์์ฝ ๋ด์ญ์๋๋ค.
                </p>
              )}
            </div>
            <div class="h-42p px-4vw  ">
              {resNum != "" && (
                <div class="h-full">
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
              )}
              <div class="h-full overflow-y-scroll">
                {phone != "" &&
                  data.map((ticket) => (
                    <div>
                      <hr class="w-full  m-auto mb-3vh" />
                      <Ticket
                        title={ticket.title}
                        date={ticket.date}
                        time={ticket.time}
                        seats={ticket.seats}
                        price={ticket.price}
                      />
                      <hr class="w-full  m-auto " />
                    </div>
                  ))}
              </div>
            </div>
            <div class="h-20p mt-10p w-full text-center m-auto place-items-center">
              <CustomButton
                name="์์ฝ์ผ๋ก ๋์๊ฐ๊ธฐ"
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
