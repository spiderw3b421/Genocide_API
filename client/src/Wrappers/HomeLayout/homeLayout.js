import styled from "styled-components";

const Wrapper = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-rows: 5rem auto auto auto;
  .footer {
    height: 5rem;
    background: red;
  }
  .footer h2 {
    color: black;
    text-align: center;
    margin-top: 2rem;
  }
`;

export default Wrapper;