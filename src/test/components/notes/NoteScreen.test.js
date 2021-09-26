import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import '@testing-library/jest-dom';


import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { Sidebar } from '../../../components/Journal/Sidebar';
import { activeNote } from '../../../actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen';


jest.mock('../../../actions/notes',()=>({activeNote : jest.fn()}) );


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
            <NoteScreen />
        </MemoryRouter>
    </Provider>
);

describe('pruebas en NoteScreen', () => {
    

    test('debe mostrarse correctamente', () => {
        expect( wrapper).toMatchSnapshot();
    })

    test('dee diparar el active note', () => {
        wrapper.find( 'input[name="title"]').simulate('change',{
            target : {
                name : 'title',
                value : 'hola de nmuevo'
            }
        })
        expect( activeNote ).toHaveBeenLastCalledWith(
            1234,
            {   
                body: 'mundo',
                title : 'Hola de nuevo',
                id : 1234,
                date: 0

            }
        )
    })
    
    
})
