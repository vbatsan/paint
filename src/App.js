import React, {useState} from "react";

import {AppContext} from "./appContext";
import StartPanel from "./components/StartPanel";
import Container from "./components/shared/Container";
import PaintBoard from "./components/PaintBoard";

function App() {
    const[state, setState] = useState({
        canvas: null,
        drawLine: null,
        drawRectangle: null,
        fillCanvas: null,
    })

  return (
      <AppContext.Provider value={{state, setState}}>
          <Container height={"100%"} flex justify={state.canvas ? 'space-between' : 'center'} align={'center'}>
              {!state.canvas &&  <StartPanel/>}
              {state.canvas && <PaintBoard canvasSize={state.canvas} appState={state} steps={Object.keys(state)}/>}
          </Container>
      </AppContext.Provider>


  );
}

export default App;
