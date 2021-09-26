
import Swal from 'sweetalert2';
import {db} from '../firebase/firebase_config.js'
import { fileUpload } from '../helpers/fileUpload.js';
import { loadNotes } from '../helpers/loadNotes.js';
import {types} from '../types/types.js'

// Cargar un nuevo registro en la Base de Datos..

export const startNewNote = ()=>{
    return async(dispatch, getState) =>{
        const {uid} = getState().auth;
        
        const newNote = {
            title: '',
            body : '',
            date : new Date().getTime(),
        }
        try {
            const doc = await db.collection(`${uid}/journal/notes`).add( newNote )

            dispatch( activeNote(doc.id, newNote ) );
            dispatch( addNewNote(doc.id, newNote ) );
            
        } catch (error) {
            console.log( error );
        }
        
    }
}

export const activeNote = (id,note)=>({
    type : types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const addNewNote = (id,note)=>({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes =(uid)=> {

    return async(dispatch)=>{

        const notes = await loadNotes( uid );

        dispatch( setNotes( notes ) );
    }
}

export const setNotes = ( notes )=>({
    type: types.notesLoad,
    payload: notes
})


export const startSaveNote = (note)=>{
    return async(dispatch,getState)=>{
        const {uid} = getState().auth;

        if( !note.url){
            delete note.url;
        }


        const noteToFirestore = {...note}; // copia del objeto
        delete noteToFirestore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
    
        dispatch( refreshNote(note.id, note) );

        Swal.fire('Saved :)', note.title, 'success');

    }
}


export const refreshNote = (id,note)=>({
    type: types.notesUpdated,
    payload: {
        id,
        note
    }
})


export const startUpload = (file)=>{
    return async(dispatch, getState)=>{
        const { active:activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Por favor , espere :)',
            allowOutsideClick: false,
            onBeforeOpen: ()=>{
                Swal.showLoading();
            }
        });
        try {
            const fileUrl = await fileUpload(file);
            activeNote.url = fileUrl;
            dispatch( startSaveNote( activeNote));
    
            Swal.close();
        } catch (error) {
            console.log(error)
        }
       
    }
}

export const startDeleting = ( id )=>{
    return async(dispatch, getState)=>{
        const uid = getState().auth.uid;
        await db.doc(`/${ uid }/journal/notes/${ id }`).delete()
            .then(()=> Swal.fire('Suces','Deleted :)','success'))
            .catch(e => Swal.fire('Error',e,'error'));
        dispatch( deleteNote(id));
    }
}

export const deleteNote = (id)=>({
    type: types.notesDelete,
    payload : id
})

export const noteLogout = ()=>({
    type: types.notesLogoutCleaning
    
})