import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';


/** Componente Item del listado de Notas del menu lateral, */
export const JournalEntry = ({id,date,title,body,url}) => {
    
    const noteDate = moment( date );
    const dispatch = useDispatch();

    const handleEntryClick = ()=>{
        dispatch( activeNote( id, {
            title,
            body,
            date,
            url
        } ) )
    }

    return (
        <div className="journal__entry animate__animated animate__fadeInDown"
             onClick={handleEntryClick}
        >
            {  url &&
                <div className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`,
                    }}
                ></div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                   {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>
        </div>
    )
}
