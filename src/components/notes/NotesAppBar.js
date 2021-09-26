import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUpload } from '../../actions/notes';


/**Barra de Cabecera del espacio de nota Tiene una fecha y dos botones */
export const NotesAppBar = () => {

    
    const {active} = useSelector(state => state.notes)

    const noteDate = moment(active.date);
    const dispatch = useDispatch();



    const handlePictureUpload = ()=>{
        document.querySelector('#fileSelector').click();
    }

    const handleChangeFile =(e)=>{
        const file = e.target.files[0];

        dispatch ( startUpload( file ) );
    }
    
    const handleSave = ()=>{
        dispatch( startSaveNote(active))
    }

    
    
    return (
        <div className="notes_appbar">
            <span> {noteDate.format("dddd Do, MMMM YYYY")} </span>

            <input 
                id="fileSelector"
                name="file"
                type="file"
                style={{display:'none'}}
                onChange={handleChangeFile}
                
            />

            <div>
                <button className="btn"
                    onClick={handlePictureUpload}
                >
                    Picture
                </button>
                <button className="btn"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    )
}
