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
        <div className="card shadow-sm h-100">
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
                {/* Simulando Trabajo/Estado ya que a menudo viene con los datos del personaje o lo asumimos */}
                <p className="card-text text-muted mb-2">Personaje</p>
                
                <div className="d-flex justify-content-center align-items-center mb-3">
                   <span className="badge badge-pill badge-status-custom border mx-1">Edad Desconocida</span>
                   <span className="badge badge-pill badge-status-custom border mx-1">Vivo</span>
                </div>
                
                <p className="card-text text-truncate" title={character.quote}>"{character.quote}"</p>

                <div className="d-flex justify-content-between mt-auto">
                    <Link to={`/character/${character.id}`} className="btn btn-outline-primary mr-2">
                        ¡Ver más!
                    </Link>
                    <div>
                         <button 
                            className={`btn btn-outline-warning mx-2 ${isFavorite ? "active" : ""}`}
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
                            className={`btn btn-outline-success mx-2 ${isLiked ? "active" : ""}`}
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
