import React, { useEffect, useState } from 'react'

import {
    BrowserRouter as Router,
    Redirect,
    Switch
} from 'react-router-dom';

import { JournalScreen } from '../components/Journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import {firebase} from '../firebase/firebase_config.js'
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import {  startLoadingNotes } from '../actions/notes';



// Redirecciona de a cuerdo al path indicado
export const AppRouter = () => {
    
    const [checking, setchecking] = useState(true);
    const [isLoguedIn, setisLoguedIn] = useState(false);

    const dispatch = useDispatch();
    // para obtener y mantener el logueo del usuario
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user)=>{
            // operador ? que chequea que user no sea null
            if( user?.uid ){    
                dispatch( login(user.uid,user.displayName) );
                setisLoguedIn(true);

                dispatch( startLoadingNotes(user.uid) );
                
    
            } else setisLoguedIn(false);
            setchecking(false);
        })
        
    }, [dispatch,setchecking,setisLoguedIn])
    

    if(checking){
        return (<h1 className="loading animate__animated animate__flash">Cargando..</h1>);
    }
    
    return (
        <Router>
            <Switch> 
                <PublicRoute 
                    isAutenticated = {isLoguedIn}
                    path="/auth/" 
                    component={AuthRouter} 
                />
                <PrivateRoute 
                    isAutenticated = {isLoguedIn}
                    exact path="/" 
                    component={JournalScreen} 
                />

                <Redirect to="/auth/login" />
            </Switch>
        </Router>
    )
}
