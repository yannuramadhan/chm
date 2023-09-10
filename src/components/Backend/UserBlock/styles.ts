import styled from "styled-components";

export const UserSection = styled("section")`
  background-color: hsl(200, 12%, 80%);
  display: flex;
  justify-content: center; /* Menggunakan space-between untuk menghindari tumpang tindih */
  padding: 5.5rem 8rem 0rem 25rem;
  min-height: 100vh;
  min-width: 100vw;

  @media screen and (max-width: 1024px) {
    padding: 10rem 0rem 0rem 0rem;
  }
`;

export const Content = styled("p")`
  margin: 0rem 0rem 0rem 0rem;
`;

export const ContentWrapper = styled("div")`
  position: relative;
`;

export const ServiceWrapper = styled("div")`
  justify-content: space-between;
  max-width: 100%;
`;

export const MinTitle = styled("h6")`
  font-size: 15px;
  line-height: 1rem;
  padding: 0rem 0;
  text-transform: uppercase;
  color: #000;
  font-family: "Motiva Sans Light", sans-serif;
`;

export const MinPara = styled("p")`
  font-size: 13px;
`;

