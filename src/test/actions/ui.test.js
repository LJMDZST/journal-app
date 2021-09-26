import { limpiarError, mostrarError, uiFinishLoading, uiStartLoading } from "../../actions/ui"
import { types } from "../../types/types";


describe('Pruebas en ui Actions', () => {
    
    test('todas las acciones deben funcionar', () => {
        
        const action = mostrarError( 'ERROR!' );

        expect(action).toEqual({
            type: types.uiSetError,
            payload: 'ERROR!'
        })

    })
    
    const actionlimpiarError  =  limpiarError();
    const actionuiStartLoading  =  uiStartLoading();
    const actionuiFinishLoading =   uiFinishLoading();

    expect(actionlimpiarError  ).toEqual({
        type: types.uiRemoveError,
    })
    expect(actionuiStartLoading).toEqual({
        type: types.uiStartLoading,
    })
    expect(actionuiFinishLoading).toEqual({
        type: types.uiFinishLoading,
    })
    
    
    
})
