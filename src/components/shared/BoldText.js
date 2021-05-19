import styled from "styled-components";

const BoldText = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.color || 'black'};
  text-align: ${props => props.align};
`
export default BoldText
