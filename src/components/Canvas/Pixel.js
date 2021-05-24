import React from "react";
import styled from "styled-components";

const StyledPixel = styled.div`
  width: ${props => `${props.width}px`};
  height: ${props => `${props.width}px`};
  font-size: 12px;
  box-sizing: border-box;
`

export default function Pixel (props) {
   return <StyledPixel width={props.width}>
       {props.view}
    </StyledPixel>
}
