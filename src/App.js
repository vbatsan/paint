import React, {useState} from "react";

import {AppContext} from "./appContext";
import StartPanel from "./components/StartPanel";
import Container from "./components/shared/Container";
import PaintBoard from "./components/PaintBoard";
import DeleteBtn from "./components/DeleteButton";

function App() {
    const[state, setState] = useState({
        canvas: null,
        drawLine: null,
        drawRectangle: null,
        fillCanvas: null,
    })
    const [history, setHistory] = useState([])
  return (
      <AppContext.Provider value={{state, setState}}>
          <Container height={"100%"} flex justify={state.canvas ? 'space-between' : 'center'} align={'center'}>
              {!state.canvas &&  <StartPanel/>}
              {state.canvas && (<PaintBoard history={history} setHistory={setHistory}  canvasSize={state.canvas} appState={state} steps={Object.keys(state)}/>)}
              {state.canvas && (<DeleteBtn setHistory={setHistory} setState={setState}/>)}
          </Container>
      </AppContext.Provider>

  );
}

export default App;
