import { Alert } from "react-bootstrap";
export default function Cabecalho(props){
    
    return (
        <Alert className={"text-center"} variant="light">
            <h1>
                {props.titulo || "Título não fornecido"}
            </h1>
        </Alert>

    );
}