import { types } from "../types/types"



export const mostrarError = (err) => ({
    type : types.uiSetError,
    payload : err
})

export const limpiarError = () => ({
    type : types.uiRemoveError
})

export const uiStartLoading = () => ({
    type : types.uiStartLoading
})

export const uiFinishLoading = () => ({
    type : types.uiFinishLoading
})