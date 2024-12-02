import { Alert } from "react-bootstrap";
import FormCadUsuario from "./formulario/FormCadUsuario";
import Pagina from "../layouts/Pagina";
import { useEffect, useState } from "react";
import AmostragemUsuarios from "./amostragem/AmostragemUsuarios.jsx";
import { consultarUsuario } from "../../servicos/servicoUsuario.js";

export default function TelaUsuario(props) {
    const [exibirAmostragem, setExibirAmostragem] = useState(true);
    
    const [modoEdicao, setModoEdicao] = useState(false);
   
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({
        id:0,
        usuario:"",
        dataIngresso: "",
        urlAvatar:"",
        senha:""
    });
   
    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Registro de users
                    </h2>
                </Alert>
                {
                    exibirAmostragem ?
                        <AmostragemUsuarios setExibirAmostragem={setExibirAmostragem}
                                        setModoEdicao={setModoEdicao}
                                        setUsuarioSelecionado={setUsuarioSelecionado} /> :
                        <FormCadUsuario setExibirAmostragem={setExibirAmostragem}
                                         usuarioSelecionado={usuarioSelecionado}
                                         setUsuarioSelecionado={setUsuarioSelecionado}
                                         modoEdicao={modoEdicao}
                                         setModoEdicao={setModoEdicao}

                                         />
                }
            </Pagina>
        </div>
    );

}
