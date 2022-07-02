
import { types } from './../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import {startLoading, finishLoading} from './ui';
import Swal from 'sweetalert2'; //cuadros de alerta.
import { noteLogOut } from './notes';




export const startLoginEmailPassword = (email,password)=>{

    return (dispatch)=>{//dispatch --> se lo proporciona el middleware Thunk al callback.
        dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then( ({user}) =>{
           
           dispatch(
               login(user.uid, user.displayName));
               dispatch(finishLoading());
            
        }).catch(e=>{
            console.log(e);
            dispatch(finishLoading());
            Swal.fire('Error',e.message, 'error');
        })
        

    }
}

export const registerWithEmailPasswordName = (email, password, name)=>{

    return (dispatch) => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async ({user}) =>{
           await user.updateProfile({displayName:name});
           dispatch(
               login(user.uid, user.displayName));

        }).catch(e=>{
            console.log(e);
             Swal.fire('Error',e.message, 'error');
        })
    }
}

export const startGoogleLogin = () =>{

    return (dispatch) => {

        firebase.auth().signInWithPopup(googleAuthProvider)
        .then( ({user}) =>{
           dispatch(
               login(user.uid, user.displayName));
        });
    }

}

export const login = (uid, displayName)=> ({ //retorna implicitamente un objeto.
        type: types.login,
        payload:{
            uid,
            displayName
        }
})

export const startLogout=()=>{
    return async (dispatch)=>{
       await firebase.auth().signOut();
       dispatch(logout());
       dispatch(noteLogOut());

    }
}

export const logout = () =>({
    type:types.logout

});