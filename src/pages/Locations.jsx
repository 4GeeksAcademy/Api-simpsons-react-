import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getLocations } from "../services/simpsonsServices";

/**
 * Página para mostrar la lista de Ubicaciones.
 */
export const Locations = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        if (store.locations.length === 0) {
            getLocations().then(data => {
                dispatch({ type: 'set_locations', payload: data });
            });
        }
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Ubicaciones</h1>
            <div className="row">
                {store.locations.map(location => (
                    <div key={location.id} className="col-md-4 mb-3">
                        <div className="card text-center h-100">
                             {/* Usar la imagen mapeada en el servicio (Placeholder o API) */}
                            <img src={location.image} 
                                 className="card-img-top" 
                                 alt={location.name}
                                 style={{maxHeight: '150px', objectFit: 'cover'}}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{location.name}</h5>
                                <p className="card-text text-muted">{location.use}</p> {/* API usa 'use' */}
                                <small className="text-secondary">{location.town}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
