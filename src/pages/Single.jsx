import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getCharacters } from "../services/simpsonsServices";

/**
 * Vista detallada de un personaje.
 * Muestra información completa y permite volver al inicio.
 */
export const Single = () => {
  const { store, dispatch } = useGlobalReducer();
  const { theId } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const findCharacter = () => {
        const found = store.characters.find(char => char.id === theId);
        if (found) {
            setCharacter(found);
        }
    };

    if (store.characters.length === 0) {
        getCharacters().then(data => {
            dispatch({ type: 'set_characters', payload: data });
        });
    } else {
        findCharacter();
    }
  }, [store.characters, theId]);

  if (!character) {
      if (store.characters.length === 0) {
          return (
              <div className="container text-center mt-5">
                  <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                  </div>
              </div>
          );
      }
      return <div className="container mt-5"><h1>Personaje no encontrado</h1></div>;
  }

  return (
    <div className="container mt-5">
      <div className="jumbotron bg-white shadow-sm border rounded">
        <div className="row">
             <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
                 <img 
                    src={character.image} 
                    alt={character.character} 
                    className="img-fluid rounded"
                    style={{ maxHeight: "400px" }}
                 />
             </div>
             <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
                 <h1 className="display-4 text-primary text-center text-md-left">{character.character}</h1>
                 <p className="lead font-italic text-center text-md-left">"{character.quote}"</p>
                 <hr className="my-4" />
                 <p><strong>Dirección:</strong> {character.characterDirection}</p>
                 <p><strong>Estado:</strong> Vivo (Asumido)</p>
                 
                 <div className="mt-4">
                     <Link to="/">
                        <span className="btn btn-primary btn-lg" role="button">
                            Volver al inicio
                        </span>
                     </Link>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};
