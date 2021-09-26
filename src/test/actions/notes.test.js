import { text } from 'cheerio/lib/api/manipulation';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLoadingNotes, startNewNote, startSaveNote, startUpload } from '../../actions/notes';
import { db } from '../../firebase/firebase_config';
import { fileUpload } from '../../helpers/fileUpload';
import { types } from '../../types/types';



/**
 * Para Testing de acciones que utilizan el dispatch del store
 * y firestore, se debe crear un entorno de node para testing.
 * Para no interferir con el entorno de desarrollo.
 * Esto se logra con las variables del entrono de node ( ver firebase_config.js )
 * 
 * Teniendo hecho esto necesitamos emular un store de testing utilizando
 * mock-store.
 * 
 * Luego con dicho store se van haciendo los dispatch de las acciones que 
 * queremos testear , sin modificar la base de datos de desarrollo.
 * 
 */

jest.mock( '../../helpers/fileUpload', ()=>({
    fileUpload : jest.fn( ()=>{
        return 'https://hola-mundo.com/cosa.jpg';
    } )
}) )


const middlewares = [thunk];
const mockStore = configureStore(middlewares);


const initState = {
    auth: {
        uid: 'TESTING_USER',
     },
    ui: {
        loading: false,
        msgError: null
     },
    notes: {
        notes: [],
        active: {
            id : 'fEcMCoCQdtBKAIL5UhZW',
            title : '',
            body : '',
        }
     }
};

let store = mockStore(initState);

describe('Pruebas en notes actions', () => {
    jest.setTimeout( 50000 );
    beforeEach( ()=>{
        store = mockStore(initState);
    })

    test('debe agregar una nota en startNewNote', async() => {
       

        await store.dispatch( startNewNote() );

        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type : types.notesActive,
            payload :{
                id : expect.any( String ),
                title: '',
                body : '',
                date : expect.any( Number ),
            }
        });
        expect( actions[1] ).toEqual({
            type : types.notesAddNew,
            payload :{
                id : expect.any( String ),
                title: '',
                body : '',
                date : expect.any( Number ),
            }
        });

        // borrar el documento basura que se creen despues de cada prueba
        const docId = actions[1].payload.id ;
        await db.doc(`TESTING_USER/journal/notes/${actions[0].payload.id}`).delete();
    });

    test('debe cargar todas las notas', async() => {
        
        await store.dispatch( startLoadingNotes( 'TESTING_USER' ) );
    
        const actions = store.getActions();

        expect( actions[0]).toEqual({
            type : types.notesLoad,
            payload : expect.any(Array)
        });

        const expected = {
            id : expect.any(String),
            title : expect.any(String),
            body : expect.any(String),
            date : expect.any(Number)
        }

        expect( actions[0].payload[0] ).toMatchObject( expected );

    })
    
    test('debe actualizar la nota', async() => {
        
        const note = {
            id : 'NAKSJFgfFcoGqNatUGVi',
            title : 'Hoy es viernes',
            body : 'Viernes---'
        }
        await store.dispatch( startSaveNote(note) );

        const actions = store.getActions();

        const docRef = await db.doc(`TESTING_USER/journal/notes/${note.id}`).get();

        expect( docRef.data().title ).toBe(note.title);
        

    })
    
    test( ' debebe cargar la imagen de la nota  ', async()=>{

        const file = new File([],'foto.jpg');
        await store.dispatch( startUpload( file ) );

        const docRef = await db.doc( '/TESTING_USER/journal/notes/fEcMCoCQdtBKAIL5UhZW' ).get();

        expect (docRef.data().url ).toBe('https://hola-mundo.com/cosa.jpg');

    })


    
})
