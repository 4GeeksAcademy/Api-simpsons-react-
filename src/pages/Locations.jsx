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
                    <div key={location.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                         <div className="card text-center h-100 shadow-sm border-0 rounded overflow-hidden">
                            <img src={location.image} 
                                 className="card-img-top" 
                                 alt={location.name}
                                 style={{height: '150px', objectFit: 'cover'}}
                            />
                            <div className="card-body">
                                <h5 className="card-title font-weight-bold">{location.name}</h5>
                                <p className="card-text text-muted small mb-1" style={{fontSize: '1rem'}}>{location.use}</p> {/* Medium size approx 1rem */}
                                <small className="text-secondary">{location.town}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
