import Swal from 'sweetalert2';
import {firebase, googleAuthProvider} from '../firebase/firebase_config'
import { types } from "../types/types"
import { noteLogout } from './notes';
import { uiFinishLoading, uiStartLoading } from './ui'

/** Funciones asincronas para las acciones de autenticacion */


// Accion de boton de logueo con email y password
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) =>{
        dispatch( uiStartLoading()  )
        return firebase.auth().signInWithEmailAndPassword(email,password)
            .then(({user}) => {
                dispatch( login(user.uid,user.displayName) )
                dispatch( uiFinishLoading() )
            })
            .catch((e)=>{
                dispatch( uiFinishLoading() );
                Swal.fire('Error !',e.message,'error');
            });
    }
}

// accion para registrar un nuevo ususario con contraseña
export const startRegisterWithEmailPasswordName = (email,password,name) =>{

    return (dispatch) =>{
        return firebase.auth().createUserWithEmailAndPassword(email,password)
                .then( async({ user }) =>{
                    // para actualizar el displayNAme o la foto de usuario
                    // en firebase
                    await user.updateProfile({displayName : name});
                    // console.log(user)

                     dispatch (
                        
                        login( user.uid, user.displayName )
                     )
                } )
                .catch((e)=>{
                    console.log(e);
                    Swal.fire('Error !',e.message,'error');
                });
    }


}

// Accion de boton de logueo con cuenta de google
export const startGoogleLogin = () =>{
    return ( dispatch )=>{
       return firebase.auth().signInWithPopup( googleAuthProvider )
                .then(  ({ user }) =>{
                    dispatch (
                        login( user.uid, user.displayName )
                    )
                } );
    }
}

/** accion de logueo de usuario
 *  -> retorna un objeto con los datos del usuario logueado
 */
export const login = (uid, displayName) => ({
    type : types.login,
    payload : {
        uid,
        displayName
    }
});


export const startLogout = () =>{
    return async(dispatch) => {
        await firebase.auth().signOut();

        dispatch(logout());
        dispatch(noteLogout());
    }
}
    
       
export const  logout = () =>({
    type : types.logout
})    
