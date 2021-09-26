import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries'


/** Menú lateral de la app, 
 *  Tiene el nombre de usario y el boton de cerrar sesion.
 *  Tiene un boton para agregar una nueva nota.
 *  Tiene un listado del historial de notas.
 */
export const Sidebar = () => {
    
    const state = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const handleAddNew = ()=>{
        dispatch( startNewNote() );
    }

    const handleLogout = ()=>{
        dispatch(startLogout());
    }


    return (
        <aside className="journal__sidebar">


            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span> {state.name}</span>
                </h3>

                <button className="btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            <div className="journal__new-entry"
                 onClick={handleAddNew}
            >
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">
                    New Entry
                </p>
            </div>
            
            <JournalEntries />

        </aside>
    )
}
