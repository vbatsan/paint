import styled, {keyframes} from "styled-components";

const showAnimation = keyframes`
  from {
    transform: translate(-150%, 0);
  }
  to {
    transform: none;
  }
`
const Board = styled.div`
  min-width: 300px;
  min-height: 100%;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 20px 50px 20px 50px;
  display: flex;
  animation: ${showAnimation} .3s linear forwards;
  flex-direction: column;
  align-items: center;
  background-color: #FBE7B5;
  box-shadow: 1px 1px 4px black;
`
export default Board
