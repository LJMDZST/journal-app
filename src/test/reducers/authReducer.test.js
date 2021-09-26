import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';


describe('Pruebas en authReducers', () => {
    
    const initialState = {
        uid: '000',
        name:'asd'
    }

    const nuevoUsuario = {
        uid:'001',
        name:'leax'
    }

    test('debe retornar el estado inicial', () => {
        
        const estado = authReducer( initialState,{} );
        expect(estado).toBe(initialState);

    });

    test('debe retornar el usuario logueado',()=>{
        
        const estado = authReducer(initialState,{
            type: types.login,
            payload: {
                uid: nuevoUsuario.uid,
                displayName: nuevoUsuario.name
            }
        });

        expect(estado).toEqual(nuevoUsuario);


    });

    test('debe desloguear el usuario',()=>{
        const estado = authReducer(initialState,{
            type: types.logout
        });

        expect(estado).toEqual({});        
    })
    

})
