import React from "react";
import styled from "styled-components";
import BoldText from "../shared/BoldText";
import DropZone from "../DropZone";

const Panel = styled.div`
  width: 100%;
  max-width: 450px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px black;
  padding: 20px;
  background-color: #AEE8E4;
  box-sizing: border-box;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function StartPanel() {
   return (
       <Panel>
            <BoldText color={'#396c1e'}>
                Drop your file to start drawing
            </BoldText>
           <DropZone/>
       </Panel>
   )
}
