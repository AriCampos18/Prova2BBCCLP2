import { Alert } from "react-bootstrap";
import FormCadMensagem from "./formulario/FormCadMensagem";
import Pagina from "../layouts/Pagina";
import { useEffect, useState } from "react";
import AmostragemMensagem from "./amostragem/AmostragemMensagens.jsx";
//import { produtos } from "../../dados/mockProdutos";
import { consultarMensagem } from "../../servicos/servicoMensagem.js";

export default function TelaMensagem(props) {
    const [exibirAmostragem, setExibirAmostragem] = useState(true);

    const [modoEdicao, setModoEdicao] = useState(false);

    const [mensagemSelecionada, setMensagemSelecionada] = useState({
        id:0,
        mensagem:"",
        dataHora: "",
        lida:false,
        usuario: {}

    });
   
    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Registro de mensagens
                    </h2>
                </Alert>
                {
                    exibirAmostragem ?
                        <AmostragemMensagem setExibirAmostragem={setExibirAmostragem}
                                        setModoEdicao={setModoEdicao}
                                        setMensagemSelecionada={setMensagemSelecionada} /> :
                        <FormCadMensagem setExibirAmostragem={setExibirAmostragem}
                                         mensagemSelecionada={mensagemSelecionada}
                                         setMensagemSelecionada={setMensagemSelecionada}
                                         modoEdicao={modoEdicao}
                                         setModoEdicao={setModoEdicao}

                                         />
                }
            </Pagina>
        </div>
    );

}
