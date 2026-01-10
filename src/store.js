export const initialStore=()=>{
  return{
    message: null,
    characters: [],
    episodes: [],
    locations: [],
    favorites: [], // Lista global de favoritos
    likes: {}      // Mapa de ID de personaje -> booleano
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_characters':
      return {
        ...store,
        characters: action.payload
      };
    case 'set_episodes':
      return {
        ...store,
        episodes: action.payload
      };
    case 'set_locations':
      return {
        ...store,
        locations: action.payload
      };
    case 'add_favorite':
      // Prevenir duplicados
      if (store.favorites.some(fav => fav.id === action.payload.id)) return store;
      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      };
    case 'remove_favorite':
      return {
        ...store,
        favorites: store.favorites.filter(fav => fav.id !== action.payload.id)
      };
    case 'toggle_like':
        // Alternar estado de like para un ID específico
        const currentLikeStatus = store.likes[action.payload] || false;
        return {
            ...store,
            likes: {
                ...store.likes,
                [action.payload]: !currentLikeStatus
            }
        }
    default:
      throw Error('Unknown action.');
  }    
}
