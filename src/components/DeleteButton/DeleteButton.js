import styled, {keyframes} from "styled-components";

const showBtn = keyframes`
  from {
    transform: translate(150%, 0);
  }
  to {
    transform: translate(0, 0);
  }
`

const DeleteButton = styled.div`
  width: 100px;
  height: 100px;
  cursor: pointer;
  position: fixed;
  animation: ${showBtn} .3s linear;
  top: 20px;
  transition: .3s;
  right: 20px;
  &:hover {
    width: 150px;
  }
`

export default DeleteButton;
