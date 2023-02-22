
import styled from "styled-components";

let Clock = styled.div`
margin: 30px auto;
background-color: rgb(204, 0, 255);
padding-top: 10px;
box-sizing: border-box;
width: 150px;
height: 220px;
box-shadow: 0px 5px 5px 5px  rgb(211, 217, 211);
border-radius: 15%;
`

const Display = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin: 0 auto 16px;
border-radius: 20%;
width: 90%;
height: 120px;
background-color: rgb(227, 238, 216)
`
const Digit = styled.span`
font-size: 50px;
`;

const Button = styled.button`
display: block;
border-radius: 10px;
border: rgb(23, 23, 135);
margin: 8px auto ;
background-color: rgb(23, 23, 135);
color: rgb(182, 232, 3);
width: 80%;
height: 24px;
`;
 

const TextButton = styled.span`
font-size: 16px;
`


export {Clock, Display, Button, Digit, TextButton}