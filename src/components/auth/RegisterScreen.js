import React from 'react';
import validator from 'validator';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { limpiarError, mostrarError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';





/** Ventana para crear un usuario */

export const RegisterScreen = () => {
    
    
    const { msgError } = useSelector(state => state.ui);


    const dispatch = useDispatch();
    
    
    const [values,handleInputChange ] = useForm({
        name : 'email',
        email :'email@mail.com',
        password : '123456',
        password2 : '123456',
    })

    const { name, email, password, password2 } = values;


    const handleRegister = (e) => {
        e.preventDefault();
        console.log( email, password, password2);
        if( isFormValid() ){
            dispatch( startRegisterWithEmailPasswordName(email,password,name) );
            console.log('form ok')
        }
        
    }

    const isFormValid =() =>{

        if(!validator.isEmail(email)) {
            dispatch(mostrarError('Email invalido, revise su ingreso..'));
            return false;
        } else if (!( password === password2 && password.length > 5)){
            dispatch(mostrarError('password debe tener al menos 6 caracteres ..'));
            return false;
        }
        dispatch(limpiarError());
        return true;

    }
     
    return (
        <div>
            <h3 className="auth__title">Register</h3>
            {
                msgError && 

                <div className="auth__alert_error">
                    {msgError}
                </div>
            }
            
            
            <form 
                onSubmit={ handleRegister }
            >   

                <input className="auth__input"
                    type="text"
                    placeholder="Name"
                    name="name"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={name}
                />

                <input className="auth__input"
                    type="text"
                    placeholder="email"
                    name="email"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={email}
                />
                <input className="auth__input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={password}
                />
                <input className="auth__input"
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={password2}
                />

                <button className="btn btn-primary btn-block mb-5"
                    type="submit"
                >
                    Register
                </button>

                
                <Link to="/auth/login"
                    className="link mt-1"
                >
                    Already Register ?
                </Link>
            </form>
        </div>
    )
}
