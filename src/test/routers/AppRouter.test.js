import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import '@testing-library/jest-dom';


import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { AppRouter } from '../../routers/AppRouter';
import { login } from '../../actions/auth';
import { act } from 'react-dom/test-utils';

import {firebase} from '../../firebase/firebase_config.js';

jest.mock('../../actions/auth.js',()=>({
        login : jest.fn(),
       
    }) 
);

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth : {},
    ui : {
        loading : false,
        msgError : null
    },
    notes : {
        active : {
            id: '123465'
        },
        notes : [] 
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();




describe('pruebas en <AppRouter />', () => {
    

    test(' debe llamar el login si estoy autenticado', async() => {

        let user ;

        await act( async()=>{

            const userCred = await firebase.auth().signInWithEmailAndPassword('leax@gmail.com','12345678');
            user = userCred.user;

            const wrapper = mount(
                <Provider store={ store }>
                    <MemoryRouter>  
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            )

        });

        expect( login ).toHaveBeenCalled();

    })
    
})
