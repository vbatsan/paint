import styled from "styled-components";

const Notification = styled.p`
  font-size: 14px;
  color: ${props => props.success ? "green" : "red"};
`

export default Notification
