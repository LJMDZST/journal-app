import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import '@testing-library/jest-dom';


import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { JournalEntry } from '../../../components/Journal/JournalEntry';
import { activeNote } from '../../../actions/notes';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
    id: 0,
    title: 'Hola',
    date: 0,
    body: 'Mundo',
    url: 'http://imagen.com/imagen.jpg'
}

const wrapper = mount(
    <Provider store={store}>
        <JournalEntry {...note} />
    </Provider>
);



describe('Pruebas en JorunalEntry', () => {
    
    test(' debe mostrar correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();


    });

    test('debe activar la nota', () => {
        
        wrapper.find( '.journal__entry').prop( 'onClick')();

        expect( store.dispatch ).toHaveBeenCalledWith(
            activeNote( note.id , { ...note } )
        );

    })
    
    

})
