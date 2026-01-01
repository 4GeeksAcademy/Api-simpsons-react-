import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getEpisodes } from "../services/simpsonsServices";

/**
 * Page to display list of Episodes.
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
            <h1 className="text-center mb-4">Episodes</h1>
            <ul className="list-group">
                {store.episodes.map(episode => (
                    <li key={episode.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <h5 className="mb-1">{episode.title}</h5>
                            <small>S{episode.season} E{episode.episode}</small>
                        </div>
                        <span className="badge badge-primary badge-pill">{episode.airDate}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
