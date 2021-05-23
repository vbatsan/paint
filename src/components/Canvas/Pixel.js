import React from "react";
import styled from "styled-components";

const StyledPixel = styled.div`
  width: 8px;
  min-height: 8px;
  font-size: 12px;
  box-sizing: border-box;
`

export default function Pixel (props) {
   return <StyledPixel>
       {props.view}
    </StyledPixel>
}
