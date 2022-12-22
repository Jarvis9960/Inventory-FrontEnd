import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "./axios";
import Alert from "react-bootstrap/Alert";

const LoginSection = styled.section`
  padding: 10rem 35rem;

  .icon {
    height: 10rem;
    width: 10rem;
    position: relative;
    left: 7rem;
    bottom: 2rem;
  }

  .button {
    position: relative;
    left: 9.4rem;
    top: 1rem;
  }

  .logging {
    opacity: 0.2;
  }

  @media only screen and (max-width: 600px) {
    padding: 6rem;

    .icon {
        height: 7rem;
        width: 6rem;
        left: 4rem;
    }

    .button {
      left: 6rem;
    }
  }
`;

const AlertSetting = styled.section`
  margin-bottom: 4rem;
`;

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setPending] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleInput = async function (e) {
    e.preventDefault();
    setPending(true);

    try {
      const loginData = {
        email: email,
        password: password,
      };

      const response = await axios({
        method: "post",
        url: "/login",
        data: {
          email: email,
          password: password,
        },
      });

      const tokens = await response.data.user.tokens;

      const tokenNo = (await tokens.length) - 1;

      const token = await tokens[tokenNo];

      const responseStatus = await response.status;

      if (responseStatus > 200 && responseStatus < 299) {
        console.log("inside this function");
        props.isLogin(false);
        props.isLogout(true);
        setPending(false);
        setSuccess(true);
        localStorage.setItem("token", token.token);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setPending(false);
      setFailed(true);
      setTimeout(() => {
        setFailed(false);
      }, 2000);
    }
  };

  return (
    <>
      <LoginSection>
        {success && (
          <AlertSetting>
            <Alert variant="success">
              <Alert.Heading>Login Successful</Alert.Heading>
              <p>Hey, Nice to meet you</p>
            </Alert>
          </AlertSetting>
        )}
        {failed && (
          <AlertSetting>
            <Alert variant="danger">
              <Alert.Heading>Login Failed</Alert.Heading>
              <p>Please check out all the details</p>
            </Alert>
          </AlertSetting>
        )}
        <img src="./images/login.png" alt="Login" className="icon" />
        <form onSubmit={handleInput}>
          <div class="mb-3 row g-1 align-item-center">
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control is-invalid"
                id="floatingInputInvalid"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label for="floatingInputInvalid">Email address</label>
            </div>
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label for="floatingPassword">Password</label>
            </div>
            <div id="passwordHelpBlock" class="form-text">
              Your password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.
            </div>
          </div>
          {isPending && (
            <button
              disabled
              type="submit"
              className="btn btn-primary button logging"
            >
              Logging
            </button>
          )}
          {!isPending && (
            <button type="submit" className="btn btn-primary button">
              LogIN
            </button>
          )}
        </form>
      </LoginSection>
    </>
  );
};

export default Login;
