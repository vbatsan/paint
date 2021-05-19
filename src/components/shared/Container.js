import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  box-sizing: border-box;
  margin: 0 auto;
  display: ${props => props.flex ? 'flex': 'block'};
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
  padding: 0 20px 0 20px;
`
export default Container
