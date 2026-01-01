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
            <ul className="list-group">
                {store.episodes.map(episode => (
                    <li key={episode.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="mb-1">{episode.name}</h5> {/* API usa 'name' no 'title' */}
                            <small>T{episode.season} E{episode.episode_number}</small> {/* T=Temporada, E=Episodio */}
                        </div>
                        <span className="badge badge-primary badge-pill">{episode.airdate}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
