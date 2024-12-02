import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarUsuario, excluirUsuario, gravarUsuario, alterarUsuario } from "../servicos/servicoUsuario.js";

import ESTADO from "./estado.js";

export const buscarUsuario = createAsyncThunk('buscarUsuario', async ()=>{
    const resultado = await consultarUsuario();
    
    try {
        if (Array.isArray(resultado)){
            return {
                "status":true,
                "mensagem":"Usuarios recuperados com sucesso",
                "listaUsuarios":resultado
            }
        }
        else
        {
            return {
                "status":false,
                "mensagem":"Erro ao recuperar os usuarios do backend.",
                "listaUsuarios":[]
            }
        }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
            "listaUsuarios":[]
        }
    }
});

export const apagarUsuario = createAsyncThunk('apagarUsuario', async (usuario)=>{

    console.log(usuario);
    const resultado = await excluirUsuario(usuario);
    console.log(resultado);
    try {
            return {
                "status":resultado.status,
                "mensagem":resultado.mensagem,
                "codigo":resultado.codigo
            }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
        }
    } 
});

export const inserirUsuario = createAsyncThunk('inserirUsuario', async (usuario)=>{

    try{
        const resultado=await gravarUsuario(usuario);
        if(resultado.status)
        {
            
            usuario.codigo=resultado.codigo;
            return{
                "status":resultado.status,
                "mensagem":resultado.mensagem,
                "usuario":usuario
            };
        }
        else{
            return{
                "status":resultado.status,
                "mensagem":resultado.mensagem
            };
        }
    } catch(erro){
        
        return{
            "status":false,
            "mensagem":"Nao foi possivel se comunicar com o backend" + erro.message
        };
    }
});

export const atualizarUsuario = createAsyncThunk('atualizarUsuario', async (usuario)=>{
    
    try{
        const resultado=await alterarUsuario(usuario);
        
        return{
            "status":resultado.status,
            "mensagem":resultado.mensagem,
            "usuario":usuario
        };
    } catch(erro){
        
        return{
            "status":false,
            "mensagem":"Nao foi possivel se comunicar com o backend" + erro.message
        };
    }
});

const usuarioReducer = createSlice({
    name:'usuario',
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaUsuarios:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(buscarUsuario.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE
            state.mensagem="Processando requisição (buscando usuarios)"
        })
        .addCase(buscarUsuario.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            state.listaUsuarios=action.payload.listaUsuarios;
          } 
          else{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaUsuarios=action.payload.listaUsuarios;
          } 
        })
        .addCase(buscarUsuario.rejected, (state, action) =>{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaUsuarios=action.payload.listaUsuarios;
        })
        .addCase(apagarUsuario.pending, (state,action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando a requsição(excluindo o usuario do backend";
        })
        .addCase(apagarUsuario.fulfilled,(state,action) =>{
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            if(action.payload.status){                        
                state.listaUsuarios=state.listaUsuarios.filter((item)=> item.codigo !== action.payload.codigo);
               
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
            }
        })
        .addCase(apagarUsuario.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(inserirUsuario.pending, (state, action)=>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando a requsição(incluindo o usuario no backend";
        })
        .addCase(inserirUsuario.fulfilled,(state,action) =>{
            if(action.payload.status){     
                               
                state.estado=ESTADO.OCIOSO; 
                state.mensagem=action.payload.mensagem;
                state.listaUsuarios.push(action.payload.usuario);
               
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
            }
        })
        .addCase(inserirUsuario.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(atualizarUsuario.pending, (state,action)=>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando a requsição(alterando o usuario no backend";
        })
        .addCase(atualizarUsuario.fulfilled, (state,action)=>{
            if(action.payload.status){     
                             
                state.estado=ESTADO.OCIOSO; 
                state.mensagem=action.payload.mensagem;
                state.listaUsuarios=state.listaUsuarios.map((item)=> item.codigo===action.payload.usuario.codigo ? action.payload.usuario : item);
                
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
            }
        })
        .addCase(atualizarUsuario.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
    }
});

export default usuarioReducer.reducer;