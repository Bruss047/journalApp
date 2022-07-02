import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import {PrivateRoute} from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from './../actions/notes';


export const AppRouter = () => {

    const dispatch = useDispatch();

    const [cheking, setCheking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged(async (user)=>{ //va a observar cada vez que cambie la autenticacion del usuario. (se va a ejecutar solo una vez cada vez que se refresque el navegador)

            if(user?.uid){
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                dispatch(startLoadingNotes(user.uid));

            }else{
                setIsLoggedIn(false);
            }
            setCheking(false);
        })

    }, [dispatch, setCheking, setIsLoggedIn]);

    if(cheking){
        return (
            <h1>Espere...</h1>
        )
    }

    return (
        <div>
            <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated={ isLoggedIn }
                    />

                    <PrivateRoute 
                        exact
                        isAuthenticated={ isLoggedIn }
                        path="/"
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
         
        </div>
    )
}
