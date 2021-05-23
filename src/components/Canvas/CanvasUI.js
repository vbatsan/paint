import styled from 'styled-components'

const Canvas = styled.div`
  width: ${props => `${props.cols * 8}px`};
  padding: 10px;
  margin-bottom: 20px;
  border: 1px dashed black;
  display: flex;
  flex-wrap: wrap;
`
export default Canvas
