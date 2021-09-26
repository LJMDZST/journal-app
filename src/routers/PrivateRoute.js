import React from 'react'
import {Route, Redirect } from 'react-router';
import PropTypes from 'prop-types'

/** Elemento wrapper que redirecciona a las rutas privadas si el usuario
 *  esta logueado, sino a la pantalla loggin
 */
export const PrivateRoute = ({
    isAutenticated,
    component : Component,
    ...rest
}) => {

    localStorage.setItem('lastPath',rest.location.pathname);

    return (
        <Route {...rest} 
            component = { (props) =>(
                // (props) representa el estado previo del componente
                (isAutenticated) // operador ternario
                    ? (<Component {...props}/>)    // verdadero
                    : (<Redirect to = "/auth/login"/>)   // falso
            ) }

        
        />
    )
}

PrivateRoute.propTypes = {
    isAutenticated : PropTypes.bool.isRequired,
    component : PropTypes.func.isRequired
}
