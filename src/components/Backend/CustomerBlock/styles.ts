import styled from "styled-components";

export const CustomerSection = styled("section")`
  display: flex;
  justify-content: space-between; /* Menggunakan space-between untuk menghindari tumpang tindih */
  padding: 5rem 2rem 0rem 19rem;
  min-height: 100vh;
  min-width: 100vw;

  @media screen and (max-width: 1024px) {
    padding: 10rem 0rem 0rem 0rem;
  }
`;

export const Content = styled("p")`
  margin: 0;
`;

export const ContentWrapper = styled("div")`
  position: sticky;
  max-height: 100vh; /* Optional: Mengatur tinggi maksimum konten */
  overflow: auto; /* Menambahkan geser jika kontennya melebihi layar */
`;

export const ServiceWrapper = styled("div")`
  justify-content: space-between;
  max-width: 100%;
`;

export const MinTitle = styled("h6")`
  font-size: 15px;
  line-height: 1rem;
  padding: 0;
  text-transform: uppercase;
  color: #000;
  font-family: "Motiva Sans Light", sans-serif;
`;

export const MinPara = styled("p")`
  font-size: 13px;
`;

