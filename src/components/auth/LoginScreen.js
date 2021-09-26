import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startGoogleLogin, startLoginEmailPassword} from '../../actions/auth';


/** Ventana para iniciar y entrar en la aplicacion. */
export const LoginScreen = () => {
    
    const {msgError,loading} = useSelector(state => state.ui);
    /** useDispatch() permite usar el dispatch de acciones
     *  desde cualquier lugar de la aplicacion
     */
    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        email : 'leax@gmail.com',
        password : '1234'
    })

    const {email, password} = formValues;

    const handleLogin = (e) =>{
        e.preventDefault();
        
        /**usando useDispatch podemos hacer el dispatch con
         * la accion asincrona startLoginEmailPassword()
         */
        if( !msgError ){
            dispatch( startLoginEmailPassword(email, password) );
        }
           
        
    }

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }

    return (
        <div >
            <h3 className="auth__title">Login</h3>

            {
                msgError && 

                <div className="auth__alert_error">
                    {msgError}
                </div>
            }
            <form
                 
                onSubmit= { handleLogin }
            >
                <input className="auth__input"
                    type="text"
                    placeholder="email"
                    name="email"
                    autoComplete="off"
                    value = { email }
                    onChange ={ handleInputChange }
                />
                <input className="auth__input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value = { password }
                    onChange ={ handleInputChange }
                />

                <button className="btn btn-primary btn-block"
                    type="submit"
                    disabled={ loading }
                >
                    Login
                </button>

                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div className="google-btn"
                         onClick= { handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/100px-Google_%22G%22_Logo.svg.png" 
                                alt="google button" 
                            />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to="/auth/register"
                    className="link"
                >
                    Create new acoount
                </Link>
            </form>
        </div>
    )
}
