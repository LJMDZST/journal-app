import React from 'react';
import { useSelector } from 'react-redux';
import { NoteScreen } from '../notes/NoteScreen';

import { Sidebar } from './Sidebar';
import { NadaSeleccionado } from './NadaSeleccionado';

/** Ventana principal 2 */

export const JournalScreen = () => {

    const {active} = useSelector(state => state.notes);

    return (
        <div className="journal__main-content">
            <Sidebar />
            <main>
                {
                    (active)
                        ? ( <NoteScreen />)
                        : ( <NadaSeleccionado />)
                }
               
            </main>
        </div>
    )
}
