import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'


/** Seccion de nota :
 *  Tiene una cabecera (fecha, seleccionar foto y guardar) <NotesAppBar/>
 *  Tiene un espacio de escritura( Titulo, Contenido) 
 */
export const NoteScreen = () => {

    const {active:note} = useSelector(state => state.notes);
    const dispatch = useDispatch();

    const [formValues, handleInputchange,reset] = useForm(note);

    const {body,title,url} = formValues;

    const activeId = useRef(note.id);

    useEffect(() => {
        
        if(note.id !== activeId.current){
            reset(note);
            activeId.current = note.id;
        }


    }, [note,reset])


    useEffect(() => {
        
        dispatch( activeNote(formValues.id,{...formValues}) );

    }, [formValues,dispatch])

    const handleDelete = ()=>{

        dispatch( startDeleting( note.id ) );
    }

    return (
        <div className="notes__main-content animate__animated animate__fadeIn">
            <NotesAppBar />

            <div className="notes__content" >
                <input className="notes__title-input" 
                    name="title"
                    type="text"
                    placeholder="Some awesome title"
                    value={title}
                    onChange={handleInputchange}
                />

                <textarea className="notes__textarea"
                    name="body"
                    placeholder="Whats happened today :)??"
                    value={body}
                    onChange={handleInputchange}
                ></textarea>


                {   note.url &&
                    <div className="notes__image">
                        <img 
                            src={url}
                            alt="imagen"
                        />
                    </div>

                }

                <button className="btn btn-danger"
                    onClick = {handleDelete}
                >Delete</button>
                
            </div>
        </div>
    )
}
