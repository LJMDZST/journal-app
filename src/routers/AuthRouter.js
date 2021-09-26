import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

// Ruteador de autenticacion: 
// redirecciona a login o register de a cuerdo si el usuario esta o no registrado
export const AuthRouter = () => {

    return (
        <div className="auth__main">
            <div className="auth__box-container animate__animated animate__backInDown animate_deleay-2s">
                <Switch>
                    <Route exact path="/auth/login"  component={LoginScreen} />
                    <Route exact path="/auth/register"  component={RegisterScreen} />
                
                    <Redirect to="/auth/register"/>
                </Switch>
            </div>
        </div>
    )
}
