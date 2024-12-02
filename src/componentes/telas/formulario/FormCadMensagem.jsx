import { Button, Spinner, Col, Form, InputGroup,
    Row, Alert
} from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';

import { alterarMensagem } from '../../../servicos/servicoMensagem.js';
import ESTADO from '../../../redux/estado.js';

import toast, {Toaster} from 'react-hot-toast';
import {useSelector, useDispatch } from 'react-redux';
import { inserirMensagem, atualizarMensagem } from '../../../redux/mensagemReducer.js';

export default function FormCadMensagem(props) {
const [mensagem, setMensagem] = useState(props.mensagemSelecionada);
const [formValidado, setFormValidado] = useState(false);
const [usuario, setUsuario] = useState([]);
const [temUsuario, setTemUsuario] = useState(false);
const {estado,message,listaDeMensagens}=useSelector((state)=>state.mensagem);
const [mensagemExibida, setMensagemExibida]= useState("");
const despachante = useDispatch();


function manipularSubmissao(evento) {
   const form = evento.currentTarget;
   if (form.checkValidity()) {
       if (!props.modoEdicao) {
           
           despachante(inserirMensagem(mensagem));
           setMensagemExibida(message);
           setTimeout(()=>{
               setMensagemExibida("");
               setMensagem({
                   id: 0,
                   mensagem: "",
                   dataHora: "",
                   usuario: ""
               });
           },5000);
       }
       else {
           despachante(atualizarMensagem(mensagem));
           setMensagemExibida(mensagem);
           setTimeout(()=>{
               props.setModoEdicao(false);
               props.setMensagemSelecionada({
                   codigo: 0,
                   mensagem: "",
                   dataHora: "",
                   usuario:""
               });
               props.setExibirAmostragem(true);
           },5000);
       }

   }
   else {
       setFormValidado(true);
   }
   evento.preventDefault();
   evento.stopPropagation();

}

function manipularMudanca(evento) {
   const elemento = evento.target.name;
   const valor = evento.target.value;
   setMensagem({ ...mensagem, [elemento]: valor });
}


if(estado==ESTADO.PENDENTE){
   return (
       <div>
           <Spinner animation="border" role="status"></Spinner>
           <Alert variant="primary">{ mensagem }</Alert>
       </div>
   );
}
else if(estado==ESTADO.ERRO){
   return(
       <div>
           <Alert variant="danger">{ mensagem }</Alert>
           <Button onClick={() => {
                       props.setExibirAmostragem(true);
                   }}>Voltar</Button>
       </div>
   );
}
else if(estado==ESTADO.OCIOSO){
   return (
       <div>
           
      
       <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
           <Row className="mb-4">
               <Form.Group as={Col} md="4">
                   <Form.Label>ID</Form.Label>
                   <Form.Control
                       required
                       type="text"
                       id="codigo"
                       name="codigo"
                       value={mensagem.codigo}
                       disabled={props.modoEdicao}
                       onChange={manipularMudanca}
                   />
                   <Form.Control.Feedback type='invalid'>Por favor, informe o código da mensagem!</Form.Control.Feedback>
               </Form.Group>
           </Row>
           <Row className="mb-4">
               <Form.Group as={Col} md="12">
                   <Form.Label>Mensagem</Form.Label>
                   <Form.Control
                       required
                       type="text"
                       id="mensagem"
                       name="mensagem"
                       value={mensagem.mensagem}
                       onChange={manipularMudanca}
                   />
                   <Form.Control.Feedback type="invalid">Por favor, informe a mensagem!</Form.Control.Feedback>
               </Form.Group>
           </Row>
           <Row className='mt-2 mb-2'>
               <Col md={1}>
                   <Button type="submit" disabled={!temUsuario}>{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
               </Col>
               <Col md={{ offset: 1 }}>
                   <Button onClick={() => {
                       props.setExibirAmostragem(true);
                   }}>Voltar</Button>
               </Col>
           </Row>
           <Toaster position="top-right"/>
       </Form>
       {
           mensagemExibida ? <Alert variant='succeess'>{mensagem}</Alert>:""
       }
       </div>
   );
}
}