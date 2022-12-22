import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  
  const Wrapper = styled.section`
    padding: 1rem 0 2.8rem 0;
    text-align: center;
    background-color: #a3d2ca;

    .socialLinks {
      padding: 0 0.5rem;
      display: inline-block;
      margin: 0 0.5rem;
      font-family: "Caveat", cursive;
    }

    .Icon {
      height: 1rem;
      width: 1rem;
      position: relative;
      left: 0.6rem;
    }

    .copyright {
      font-family: "Rubik Vinyl", cursive;
    }
  `;

  const Links = styled.p`
    text-decoration: none;
    display: inline-block;
    color: #393e46;
  `;

  return (
    <>
      <Wrapper>
        <footer class="footer mt-auto py-3">
          <div class="container">
            <a href="https://twitter.com/ankitfukte11">
              <Links>
                <img
                  src="./images/twitter.png"
                  alt="Twitter"
                  className="Icon"
                />
                <p className="socialLinks">Twitter</p>
              </Links>
            </a>
            <a href="https://twitter.com/ankitfukte11">
              <Links>
                <img
                  src="./images/linkedin.png"
                  alt="LinkedIn"
                  className="Icon"
                />
                <p className="socialLinks">LinkedIn</p>
              </Links>
            </a>
            <a href="https://twitter.com/ankitfukte11">
              <Links>
                <img src="./images/github.png" alt="Github" className="Icon" />
                <p className="socialLinks">Github</p>
              </Links>
            </a>

            <h5 className="copyright">© Ankit Fukte</h5>
          </div>
        </footer>
      </Wrapper>
    </>
  );
};

export default Footer;
