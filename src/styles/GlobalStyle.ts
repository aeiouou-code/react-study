import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`

${reset};

@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
font-family: 'Source Sans Pro', sans-serif;

body{
  padding: 0;
  margin: 0;
  font-family : 'Source Sans Pro', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor}
}

button{
  display: flex;
  cursor: pointer;
  outline: none;
  border-radius: 3px;
};

input{
  display: flex;
  outline: none;
  padding-left: 10px;
}

a{
  text-decoration : none;
}

*{
  box-sizing: border-box;
}
`;

export default GlobalStyle;
