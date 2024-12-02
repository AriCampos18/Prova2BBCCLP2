import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarMensagem, excluirMensagem, gravarMensagem, alterarMensagem } from "../servicos/servicoMensagem.js";

import ESTADO from "./estado.js";

export const buscarMensagem = createAsyncThunk('buscarMensagem', async ()=>{
  
    const resultado = await consultarMensagem();
    try {
        if (Array.isArray(resultado)){
            return {
                "status":true,
                "mensagem":"Mensagens recuperadas com sucesso",
                "listaDeMensagens":resultado
            }
        }
        else
        {
            return {
                "status":false,
                "mensagem":"Erro ao recuperar as mensagens do backend.",
                "listaDeMensagens":[]
            }
        }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
            "listaDeMensagens":[]
        }
    }
});

export const apagarMensagem = createAsyncThunk('apagarMensagem', async (mensagem)=>{

    console.log(mensagem);
    const resultado = await excluirMensagem(mensagem);
   
    console.log(resultado);
    try {
            return {
                "status":resultado.status,
                "mensagem":resultado.mensagem,
                "id":resultado.id
            }
    }
    catch(erro){
        return {
            "status":false,
            "mensagem":"Erro: " + erro.message,
        }
    } 
});

export const inserirMensagem = createAsyncThunk('inserirMensagem', async (mensagem)=>{
 
    try{
        const resultado=await gravarMensagem(mensagem);
        if(resultado.status)
        {
           
            mensagem.id=resultado.id;
            return{
                "status":resultado.status,
                "mensagem":resultado.mensagem,
                "mensagem":mensagem
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

export const atualizarMensagem = createAsyncThunk('atualizarMensagem', async (mensagem)=>{
 
    try{
        const resultado=await alterarMensagem(mensagem);
        
        return{
            "status":resultado.status,
            "mensagem":resultado.mensagem,
            "mensagem":mensagem
        };
    } catch(erro){
      
        return{
            "status":false,
            "mensagem":"Nao foi possivel se comunicar com o backend" + erro.message
        };
    }
});

const mensagemReducer = createSlice({
    name:'mensagem',
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDeMensagens:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(buscarMensagem.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE
            state.mensagem="Processando requisição (buscando mensagens)"
        })
        .addCase(buscarMensagem.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            state.listaDeMensagens=action.payload.listaDeMensagens;
          } 
          else{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeMensagens=action.payload.listaDeMensagens;
          } 
        })
        .addCase(buscarMensagem.rejected, (state, action) =>{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeMensagens=action.payload.listaDeMensagens;
        })
        .addCase(apagarMensagem.pending, (state,action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando a requsição(excluindo a mensagem do backend";
        })
        .addCase(apagarMensagem.fulfilled,(state,action) =>{
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            if(action.payload.status){                        
                state.listaDeMensagens=state.listaDeMensagens.filter((item)=> item.codigo !== action.payload.codigo);
            
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
            }
        })
        .addCase(apagarMensagem.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(inserirMensagem.pending, (state, action)=>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando a requsição(incluindo a mensagem no backend";
        })
        .addCase(inserirMensagem.fulfilled,(state,action) =>{
            if(action.payload.status){     
                             
                state.estado=ESTADO.OCIOSO; 
                state.mensagem=action.payload.mensagem;
                state.listaDeMensagens.push(action.payload.mensagem);
                
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
            }
        })
        .addCase(inserirMensagem.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(atualizarMensagem.pending, (state,action)=>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando a requsição(alterando a mensagem no backend";
        })
        .addCase(atualizarMensagem.fulfilled, (state,action)=>{
            if(action.payload.status){     
                               
                state.estado=ESTADO.OCIOSO; 
                state.mensagem=action.payload.mensagem;
                state.listaDeMensagens=state.listaDeMensagens.map((item)=> item.id===action.payload.mensagem.id ? action.payload.mensagem : item);
                
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
            }
        })
        .addCase(atualizarMensagem.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
    }
});

export default mensagemReducer.reducer;