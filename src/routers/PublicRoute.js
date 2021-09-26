import React from 'react'
import {Route, Redirect } from 'react-router';
import PropTypes from 'prop-types'

/** Elemento wrapper que redirecciona a las rutas publicas si el usuario
 *  no esta logueado, sino a la pantalla raiz es decir dashboard
 */
export const PublicRoute = ({
    isAutenticated,
    component : Component,
    ...rest
}) => {

    return (
        <Route {...rest} 
            component = { (props) =>(
                // (props) representa el estado previo del componente
                (!isAutenticated) // operador ternario
                    ? (<Component {...props}/>)// falso 
                    :  (<Redirect to = "/"/>)// verdadero
            ) }

        
        />
    )
}

PublicRoute.propTypes = {
    isAutenticated : PropTypes.bool.isRequired,
    component : PropTypes.func.isRequired
}
