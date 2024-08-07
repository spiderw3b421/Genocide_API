import styled from "styled-components";

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  .aside {
    min-height: 100vh;
    margin-right: 3rem;
    background: black;
  }
  .title {
    color: red;
    font-size: 0.9rem;
    padding-bottom: 1rem;
  }
  .headline {
    padding: 1rem 0.45rem;
  }
  .title-underline {
    background-color: red;
    width: auto;
    margin-top: -0.7rem;
    margin-bottom: 1rem;
  }
  ul {
    margin-bottom: 1rem;
  }
  a {
    text-decoration: none;
    text-transform: capitalize;
    text-align: center;
    color: red;
    font-size: 0.8rem;
    transition: var(--transition);
    cursor: pointer;
  }
  a:hover {
    color: white;
  }
  .active {
    color: white;
  }
  @media (min-width: 800px) {
    .title {
      font-size: 1.5rem;
    }

    a {
      font-size: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.2rem;
    }
  }
`;

export default Wrapper;
