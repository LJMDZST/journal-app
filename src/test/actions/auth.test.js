import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { login, logout, startGoogleLogin, startLoginEmailPassword, startLogout, startRegisterWithEmailPasswordName } from "../../actions/auth"
import { types } from "../../types/types";

import '@testing-library/jest-dom';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);


describe( 'Pruebas con las acciones de Auth', () => {

    beforeEach(()=>{
        store = mockStore( initState );
    })

    test('login y logout deben de crear la accion respectiva', () => {
        
        const actionLogin = login( '12345','pepe' );
        const actionLogout = logout()

        expect( actionLogin ).toEqual({
            type: types.login,
            payload : {
                uid: '12345',
                displayName: 'pepe'
            }
        })

        expect( actionLogout).toEqual({
            type: types.logout
        })

    })

    test('debe realizar el startLogout', async() => {

        await store.dispatch( startLogout() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({ type: types.logout });
        expect( actions[1] ).toEqual({ type: types.notesLogoutCleaning });


    });

    test('debe realizar el startLogin con mail y password', async() => {
        
        await store.dispatch( startLoginEmailPassword ('leax@gmail.com','12345678') );

        const actions = store.getActions( );

        expect( actions[0] ).toEqual({type : types.uiStartLoading});
        expect( actions[1] ).toEqual( {
            type: types.login,
            payload: { 
                uid: 'PxmyGBrFzDWHsEIIrM0ZA8uRHM83',
                displayName: null 
            }
        });
        expect( actions[2] ).toEqual({ type: types.uiFinishLoading});

    })
    
    test( 'debe realizar el registro de un nuevo usuario', async()=>{
        
        await store.dispatch( startRegisterWithEmailPasswordName(
                'pepe@gmail.com',
                '12345678',
                'pepe'
            ));
        
        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.login,
            payload: { 
                uid : expect.any(String),
                displayName: 'pepe'
            }
        });
        

    } )
    
    
})