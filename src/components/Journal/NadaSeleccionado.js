import React from 'react'

/** Componente de inicio, que avisa que no hay notas en la aplicacion. */

export const NadaSeleccionado = () => {
    return (
        <div className="nothing__main-control animate__animated animate__fadeInRight">
            <p>
                Select something
                <br />
                pr create an entry!
            </p>
            <i className="far fa-star fa-4x mt-5"></i>
        </div>
    )
}
