import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import PropTypes from "prop-types";

/**
 * Componente que muestra la tarjeta de un personaje.
 * Incluye imagen, información básica y 3 botones de acción.
 * 
 * @param {Object} props Props del componente
 * @param {Object} props.character Objeto con la información del personaje
 */
export const CharacterCard = ({ character }) => {
    const { store, dispatch } = useGlobalReducer();
    const isFavorite = store.favorites.some(fav => fav.id === character.id);
    const isLiked = store.likes[character.id] || false;

    return (
        <div className="card shadow-sm h-100" style={{ minWidth: "18rem" }}>
            <div className="text-center p-3">
                 <img 
                    src={character.image} 
                    className="card-img-top img-fluid" 
                    alt={character.character}
                    style={{ maxHeight: "200px", objectFit: "contain" }} 
                />
            </div>
            
            <div className="card-body text-center">
                <h5 className="card-title">{character.character}</h5>
                {/* Mocking Job/Status as it often comes with character data or we assume */}
                <p className="card-text text-muted mb-2">Character</p>
                
                <div className="d-flex justify-content-center align-items-center mb-3">
                   <span className="badge badge-pill badge-light border mx-1">Unknown Age</span>
                   <span className="badge badge-pill badge-success border mx-1">Alive</span>
                </div>
                
                <p className="card-text font-italic">"{character.quote}"</p>

                <div className="d-flex justify-content-between mt-auto">
                    <Link to={`/character/${character.id}`} className="btn btn-outline-primary">
                        Learn more!
                    </Link>
                    <div>
                         <button 
                            className={`btn btn-outline-warning mr-2 ${isFavorite ? "active" : ""}`}
                            onClick={() => {
                                if (isFavorite) {
                                    dispatch({ type: "remove_favorite", payload: character });
                                } else {
                                    dispatch({ type: "add_favorite", payload: { id: character.id, name: character.character } });
                                }
                            }}
                        >
                            <i className={`${isFavorite ? "fas" : "far"} fa-heart`}></i>
                        </button>
                         <button 
                            className={`btn btn-outline-success ${isLiked ? "active" : ""}`}
                            onClick={() => dispatch({ type: "toggle_like", payload: character.id })}
                        >
                             <i className={`${isLiked ? "fas" : "far"} fa-thumbs-up`}></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

CharacterCard.propTypes = {
    character: PropTypes.shape({
        id: PropTypes.string.isRequired,
        image: PropTypes.string,
        character: PropTypes.string,
        quote: PropTypes.string
    }).isRequired
};
