import React from 'react';
import { Provider } from 'react-redux'
import { store }  from './store/store.js'
import { AppRouter } from './routers/AppRouter';
import './styles/styles.scss';


/** Applicaciion web para simular una agenda o diario personal */

// Redux -> store es una interfaz que permite cargar todas las funcionalidades 
// asincronas que utilizaran los componentes de la aplicacion. Ademas permite 
// conservar el estado de un componente mientras se interactuan con otros componentes

export const JournalApp = () => {
    return (
        <Provider store = { store }>
            <AppRouter />
        </Provider>
    )
}
