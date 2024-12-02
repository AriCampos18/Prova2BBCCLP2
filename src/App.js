import TelaMensagens from "./componentes/telas/TelaMensagem";
import TelaUsuario from "./componentes/telas/TelaUsuario";
import TelaMenu from "./componentes/telas/TelaMenu";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TelaLogin from "./componentes/telas/TelaLogin";
import { useState, createContext } from "react";
import store from './redux/store';
import { Provider } from "react-redux";

export const ContextoUsuario=createContext();

function App() {

  const [usuario,setUsuario]=useState({
    "usuario":"",
    "logado":false
  });

 
    return (
      <div className="App">
        <Provider store={store}>
        <ContextoUsuario.Provider value ={{usuario,setUsuario}}>
          <BrowserRouter>
            { 
            }
            <Routes>
              <Route path="/usuario" element={<TelaUsuario />} />
              <Route path="/mensagem" element={<TelaMensagens />} />
              <Route path="/" element={<TelaMenu />} />
            </Routes>
          </BrowserRouter>
        </ContextoUsuario.Provider>
        </Provider>
      </div>
    );
 
  
}

export default App;
