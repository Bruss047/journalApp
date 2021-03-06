import React, { useEffect, useRef } from 'react';
import { NotesAppBar } from './NotesAppBar';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from './../../hooks/useForm';
import { activeNote, startDeleting } from '../../actions/notes';


export const NoteScreen = () => {

    const dispatch = useDispatch();
    const {active:note} = useSelector(state=> state.notes);
    const [formValues, handleInputChange, reset] = useForm(note) ;
    const { body, title,id} = formValues;

    const activeId = useRef(note.id);


     useEffect(() => {
        
        if ( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id
        }

    }, [note, reset])
    

    useEffect(() => {
        
        dispatch( activeNote( formValues.id, { ...formValues } ) );

    }, [formValues, dispatch])

    const handleDelete = () =>{
        dispatch(startDeleting(id));
    }

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Título"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea
                    placeholder="Que sucedió hoy?"
                    className="notes__textarea"
                    name="body"
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>
                
                {
                    (note.url) &&
                      
                        (<div>
                            <img
                            className="notes__image" 
                                src={note.url}
                                alt="imagen"
                            />
                        </div>)
                }

                 <button 
                    className="btn btn-danger"
                    onClick={ handleDelete }
                >
                    Borrar
            </button>
                 
            </div>

        </div>
    )
}
