import { configureStore } from "@reduxjs/toolkit";
import usuarioReducer from "./usuarioReducer.js";
import mensagemReducer from "./mensagemReducer.js";

const store = configureStore({
    reducer:{
        'usuario':usuarioReducer,
        'mensagem': mensagemReducer
    }
});

export default store;