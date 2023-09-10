import styled from "styled-components";

export const WhatsappContainer = styled("div")<any>`
  padding: 10px;
  position: fixed;
  left: 0px;
  bottom: 250px;
  z-index: 10;
  cursor: pointer;
  background: transparent;
  text-align: center;
  align-items: center;
  border-radius: 4px;
  transition: all 0.3s ease-in-out;
  visibility: ${(p) => (p.show ? "visible" : "hidden")};
  opacity: ${(p) => (p.show ? "1" : "0")};
  display: flex;

  &:hover,
  &:active,
  &:focus {
    background: transparent;
  }

  @media screen and (max-width: 1240px) {
    display: none;
  }
`;
