import React, { useState } from "react";
import styled from "styled-components";
import axios from "./axios";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

const Wrapper = styled.section`
  padding: 10rem 25rem;

  .icon {
    height: 10rem;
    width: 10rem;
    position: relative;
    left: 17rem;
    bottom: 2rem;
  }

  .button {
    opacity: 0.5;
  }

  @media only screen and (max-width: 600px) {
    padding: 6rem;

    .icon {
      position: static;
      margin-left: 5rem;
    }
  }
`;

const AlertSetting = styled.section`
  margin-bottom: 4rem;
`;

const Register = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let fullName = `${firstName} ${lastName}`;

  const handleInput = async function (e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios({
        method: "post",
        url: "/register",
        data: {
          name: fullName,
          email: email,
          password: password,
          cpassword: cpassword,
          phone: phone,
        },
      });

      const responseStatus = await response.status;

      if (responseStatus > 200 && responseStatus < 299) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          navigate("/Login");
        }, 2000);
      } else {
        setIsFailed(true);
        setIsLoading(false);
        setTimeout(() => {
          setIsFailed(false);
        }, 2000);
        alert("registration failed");
      }
    } catch (error) {
      setIsLoading(false);
      alert("user already exist or something went wrong")
    }
  };

  return (
    <>
      <Wrapper>
        {isSuccess && (
          <AlertSetting>
            <Alert variant="success">
              <Alert.Heading>Register Successful</Alert.Heading>
              <p>Hey, Nice to meet you</p>
            </Alert>
          </AlertSetting>
        )}
        {isFailed && (
          <AlertSetting>
            <Alert variant="danger">
              <Alert.Heading>Registeration failed</Alert.Heading>
              <p>Please check out all the details</p>
            </Alert>
          </AlertSetting>
        )}
        <img src="./images/register.png" alt="register" className="icon" />
        <form class="row g-3" onSubmit={handleInput}>
          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">
              First Name
            </label>
            <input
              type="name"
              class="form-control"
              id="inputEmail4"
              placeholder="Ankit"
              onChange={(e) => {
                setfirstName(e.target.value);
              }}
            />
          </div>
          <div class="col-md-6">
            <label for="inputPassword4" class="form-label">
              Last Name
            </label>
            <input
              type="String"
              class="form-control"
              id="inputPassword4"
              placeholder="Fukte"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>

          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">
              Email
            </label>
            <input
              type="email"
              class="form-control"
              id="inputEmail4"
              placeholder="test@gmail.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div class="col-md-6">
            <label for="inputPassword4" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="inputPassword4"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div class="col-12">
            <label for="inputPhone" class="form-label">
              Confirm Password
            </label>
            <input
              type="Password"
              class="form-control"
              id="inputPassword4"
              onChange={(e) => {
                setCPassword(e.target.value);
              }}
            />
          </div>
          <div class="col-12">
            <label for="inputPhone" class="form-label">
              Phone
            </label>
            <input
              type="Phone"
              class="form-control"
              id="inputAddress"
              placeholder="+91"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>

          {!isLoading && (
            <div class="col-12">
              <button type="submit" class="btn btn-primary">
                Register
              </button>
            </div>
          )}

          {isLoading && (
            <div class="col-12">
              <button type="submit" class="btn btn-primary button">
                Registering
              </button>
            </div>
          )}
        </form>
      </Wrapper>
    </>
  );
};

export default Register;
