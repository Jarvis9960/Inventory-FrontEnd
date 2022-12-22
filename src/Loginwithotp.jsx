import React, { useState } from "react";
import styled from "styled-components";
import axios from "./axios";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.section`
  padding: 10rem 10rem;

  .input {
    width: 20rem;
    position: relative;
    left: 27rem;
  }

  .icon {
    height: 5rem;
    width: 5rem;
    position: relative;
    left: 35rem;
    bottom: 5rem;
  }

  .heading {
    display: inline-block;
    font-family: "Caveat", cursive;
    position: relative;
    left: 25rem;
    top: 1rem;
  }

  .validation {
    margin-left: 23rem;
    width: 30rem;
  }

  .button {
    margin: 1rem 1rem 0;
    position: relative;
    left: 32rem;
    height: 3rem;
  }

  .alertHeading {
    width: 20rem;
    height: 3.5rem;
    margin: 0 0 6rem 26.5rem;
  }

  .OTPfield {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .verify {
    position: relative;
    left: 26.5rem;
    margin: 1rem;
  }

  .verifyButton {
    margin-left: 6rem;
  }

  @media only screen and (max-width: 600px) {
    padding-bottom: 15rem;
    .mobileres {
      position: relative;
      right: 33rem;
    }

    .heading {
      margin-bottom: 2rem;
      margin-left: 6.5rem;
      width: 12rem;
    }

    .icon {
      top: 0.1rem;
    }

    .verify {
      position: absolute;
      left: 3rem;
      right: 0;
    }

    .verifyButton {
      margin-left: 6.5rem;
    }
  }
`;

const alertSection = styled.section`
  width: 20rem;
`;

const Loginwithotp = (props) => {
  const [phone, setPhoneNO] = useState("");
  const [OTP, setOTP] = useState("");
  const [btnLoading, setBtnLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [takeOtp, setTakeOtp] = useState(false);
  const [Proceed, setProceed] = useState(true);

  const navigate = useNavigate();

  const handleInput = async function (e) {
    e.preventDefault();

    console.log(phone);
    setProceed(false);

    try {
      const response = await axios({
        method: "post",
        url: "/loginwithphone",
        data: {
          phone: phone,
        },
      });

      const responseData = await response.status;

      console.log(responseData);

      if (responseData === 201) {
        setIsSuccess(true);
        setBtnLoading(false);
        setProceed(true);
        setTakeOtp(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 2000);
      }
    } catch (error) {
      setIsFailed(true);
      setProceed(true);
      setTimeout(() => {
        setIsFailed(false);
      }, 2000);
    }
  };

  const otpHandleInput = async function (e) {
    e.preventDefault();

    console.log(OTP);
    console.log(phone);

    try {
      const response = await axios({
        method: "post",
        url: "/verifywithphone",
        data: {
          phone: phone,
          OTP: OTP,
        },
      });

      console.log(response);

      const tokens = await response.data.tokens;

      const tokenNo = (await tokens.length) - 1;

      const token = await tokens[tokenNo];

      const status = response.status;

      if (status > 200 && status < 299) {
        console.log("inside this function");
        localStorage.setItem("token", token);
        props.isLogin(false);
        props.isLogout(true);
        navigate("/");
      }
    } catch (error) {
      alert("otp incorrect");
    }
  };

  return (
    <>
      <Wrapper>
        {isSuccess && (
          <Alert className="alertHeading" variant="success">
            <p>OTP send Successful</p>
          </Alert>
        )}
        {isFailed && (
          <Alert className="alertHeading" variant="danger">
            <p>OTP Failed</p>
          </Alert>
        )}
        <div className="mobileres">
          <img src="./images/OTP.png" alt="Login" className="icon" />
          <div className="heading">
            <h2>Sign Up with Phone</h2>
          </div>
          <div className="form-floating mb-2 input">
            <input
              type="tel"
              class="form-control"
              id="floatingInput"
              placeholder="+91"
              onChange={(e) => setPhoneNO(e.target.value)}
            />

            <label for="floatingInput">Phone</label>
          </div>
          <div
            id="passwordHelpBlock"
            className="form-text validation validation"
          >
            Never share your personal account otp with anyone we don't call for
            otp validation and ask for otp. #BecauseWeCare
          </div>

          {Proceed ? (
            <button
              className="btn btn-dark btn-lg button"
              onClick={handleInput}
            >
              Proceed
            </button>
          ) : (
            <button className="btn btn-dark btn-lg button">Sending</button>
          )}
        </div>

        <form onSubmit={otpHandleInput}>
          <div className="form-floating input verify">
            {takeOtp && (
              <div className="form-floating">
                <input
                  type="tel"
                  class="form-control OTPfield"
                  id="floatingOtp"
                  onChange={(e) => setOTP(e.target.value)}
                />
                <label for="floatingInput">OTP</label>
              </div>
            )}
            {!btnLoading && (
              <button className="btn btn-dark btn-lg verifyButton">
                Verify
              </button>
            )}
          </div>
        </form>
      </Wrapper>
    </>
  );
};

export default Loginwithotp;
