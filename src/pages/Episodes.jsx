import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getEpisodes } from "../services/simpsonsServices";

/**
 * Página para mostrar la lista de Episodios.
 */
export const Episodes = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        if (store.episodes.length === 0) {
            getEpisodes().then(data => {
                dispatch({ type: 'set_episodes', payload: data });
            });
        }
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Episodios</h1>
            <div className="row">
                {store.episodes.map(episode => (
                    <div key={episode.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div className="card h-100 shadow-sm border-0 rounded overflow-hidden">
                             <img src={episode.image} 
                                 className="card-img-top" 
                                 alt={episode.name}
                                 style={{height: '150px', objectFit: 'cover'}}
                            />
                            <div className="card-body">
                                <h6 className="card-title font-weight-bold text-truncate" title={episode.name}>{episode.name}</h6> {/* API usa 'name' no 'title' */}
                                <p className="card-text small text-muted">Episodio {episode.episode_number}</p>
                                <span className="badge badge-secondary badge-pill mt-2">{episode.airdate}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
