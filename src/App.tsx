import React, { useState } from "react";
import styled from "styled-components";

function App() {
  const [value, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello", value);
  };
  return (
    <Container>
      <H1>This is Title</H1>
      <form onSubmit={onSubmit}>
        <input
          value={value}
          type="text"
          placeholder="username"
          onChange={onChange}
        />
        <button>Log in</button>
      </form>
    </Container>
  );
}
export default App;

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};

  button {
    background-color: ${(props) => props.theme.btnColor};
  }
`;

const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;
