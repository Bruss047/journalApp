import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from './../../hooks/useForm';
import {setError, removeError} from './../../actions/ui';
import validator from 'validator';
import { registerWithEmailPasswordName } from '../../actions/auth';



export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const {msgError} = useSelector( state => state.ui );

    const [formValues, handleInputChange ] = useForm({

            name:'Doe',
            email:'ejemplo@gmail.com',
            password: '123456',
            password2: '123456'

    });

    

    const {name, email, password, password2} = formValues;

    const handleRegister = (e)=>{
        e.preventDefault();
        if(isFormValid()){
        
            dispatch(registerWithEmailPasswordName(email,password,name));

        }
    }

    const isFormValid = () =>{

        if(name.trim().length===0){
            dispatch(setError('Nombre Requerido'));
            return false;

        }else if(!validator.isEmail(email)){
            dispatch(setError('Email Invalido'));
            return false;

        }else if( password !==password2 || password.length < 5){
            dispatch(setError('Password debe coincidir o tener al menos 6 caracteres'));
            return false;
        }
        
        dispatch(removeError());

        return true;
    }

    console.log(formValues);
    return (
         <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleRegister} 
                  className="animate__animated animate__fadeIn animate__faster" >
                      
                {
                    msgError &&
                    <div className="auth__alert-error">
                     {msgError}
                    </div>
                }
                

                <input type="text"
                        placeholder="Nombre"
                        name="name"
                        className="auth__input"
                        autoComplete="off"
                        value={name}
                        onChange={handleInputChange}
                        
                    />

                <input type="text"
                        placeholder="Email"
                        name="email"
                        className="auth__input"
                        autoComplete="off"
                        value={email}
                        onChange={handleInputChange}
                    />

                <input type="password"
                        placeholder="Password"
                        name="password"
                        className="auth__input"
                        value={password}
                        onChange={handleInputChange}
                    />
                
                <input type="password"
                        placeholder="Confirmar Password"
                        name="password2"
                        className="auth__input"
                        value={password2}
                        onChange={handleInputChange}
                    />

                 <button className="btn btn-primary btn-block mb-5"
                         type="submit"
                        >
                     Registrarse
                </button>   
               

              <Link 
                  to="/auth/login"
                  className="link">
                Ya estas registrado?
              </Link>
            </form>
        </>
    )
}
