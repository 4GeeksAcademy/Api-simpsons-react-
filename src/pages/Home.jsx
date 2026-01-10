import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getCharacters } from "../services/simpsonsServices.js";
import { CharacterCard } from "../components/CharacterCard.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    // Only fetch if empty to avoid reloading on nav back
    if (store.characters.length === 0) {
        getCharacters().then(data => {
            dispatch({ type: 'set_characters', payload: data });
        });
    }
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5 text-warning" style={{ textShadow: "2px 2px #000" }}>
          Personajes de Los Simpsons
      </h1>
      <div className="row">
        {store.characters.length > 0 ? (
            store.characters.map(character => (
                <div key={character.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                    <CharacterCard character={character} />
                </div>
            ))
        ) : (
             <div className="col-12 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
             </div>
        )}
      </div>
    </div>
  );
};