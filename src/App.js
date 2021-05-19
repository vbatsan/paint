import React, {useState} from "react";

import {AppContext} from "./appContext";
import StartPanel from "./components/StartPanel";
import Container from "./components/shared/Container";

function App() {
    const[state, setState] = useState({
        canvas: '',
        lines: [],
        rectangles: [],
        fillCanvas: {
            target: '',
            filler: ''
        }
    })
  return (
      <AppContext.Provider value={{state, setState}}>
          <Container flex justify={'center'} align={'center'}>
              <StartPanel/>
          </Container>
      </AppContext.Provider>


  );
}

export default App;
