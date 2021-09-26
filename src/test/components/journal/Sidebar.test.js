import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import '@testing-library/jest-dom';


import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { Sidebar } from '../../../components/Journal/Sidebar';
import { startNewNote } from '../../../actions/notes';
import { startLogout } from '../../../actions/auth';


jest.mock('../../../actions/notes',()=>({startNewNote : jest.fn()}) );
jest.mock('../../../actions/auth',()=>({startLogout : jest.fn()}) );

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

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <Sidebar />
        </MemoryRouter>
    </Provider>
);

describe('pruebas en sidebar', () => {
    
    test('debe mostrrarse correctamente',()=>{
        expect( wrapper).toMatchSnapshot();
    })

    test(' debe llamar el logout', () => {
        wrapper.find( 'button' ).prop( 'onClick')();
        expect( startLogout ).toHaveBeenCalled();
    })
    
    test(' debe llamar el startNewNote', () => {
        wrapper.find( '.journal__new-entry' ).prop( 'onClick')();

        expect( startNewNote ).toHaveBeenCalled();
    })
    
})
