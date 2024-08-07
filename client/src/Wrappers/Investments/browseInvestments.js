import styled from "styled-components";

const Wrapper = styled.main`
  min-height: 100vh;

  .section-center {
    margin: 0 auto;
    width: 90vw;
  }
  .article {
    width: 80vw;
    position: relative;
    margin: 0 auto;
    background: black;
    border-radius: 10px;
    margin-bottom: 1.5rem;
  }
  .groupInfo {
    background: transparent;
    position: absolute;
    right: 5px;
    top: 5px;
  }
  .btn-group {
    background: transparent;
    border: transparent;
    color: red;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  .info-text {
    color: red;
    margin-bottom: 1rem;
  }
  svg {
    font-size: 1.5rem;
    background: transparent;
    border: transparent;
  }
  p {
    text-align: center;
    text-transform: capitalize;
    color: white;
    margin: 0 auto;
    margin-bottom: 0.4rem;
  }
  h4 {
  }
  .groupName {
    padding: 1rem 0;
    color: red;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .investment {
    color: red;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 1.2rem;
  }
  .dues {
    color: red;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 1.2rem;
  }
  .members {
    color: red;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 1.2rem;
  }
  .desc {
    padding-bottom: 0.5rem;
    color: red;
    text-align: center;
    text-transform: capitalize;
    margin-bottom: 1.5rem;
  }
  .firstName {
    color: red;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 1.2rem;
  }
  .state {
    color: red;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 1.2rem;
  }
  .city {
    color: red;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 1.2rem;
  }
  a {
    text-decoration: none;
    text-align: center;
  }

  .btn-block {
    transition: var(--transition);
  }
  .btn-block:hover {
    background: white;
    color: black;
  }
  @media (min-width: 700px) {
    .article {
      width: 50vw;
    }
  }
  @media (min-width: 800px) {
    .section-center {
      display: grid;
      grid-template-columns: 0.2fr 0.5fr;
    }
    .article {
      position: relative;
      width: 40vw;
      margin-right: 4rem;
    }
    .btn-block {
      position: absolute;
      bottom: 0;
    }
  }
  @media (min-width: 950px) {
    .article {
      width: 30vw;
    }
  }
`;

export default Wrapper;
