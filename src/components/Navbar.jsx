import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

/**
 * Navbar component with navigation links and Favorites dropdown.
 */
export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const { favorites } = store;

    return (
        <nav className="navbar navbar-light bg-light mb-3 px-4">
            <Link to="/">
                <span className="navbar-brand mb-0 h1">The Simpsons Blog</span>
            </Link>
            <div className="ml-auto">
                <Link to="/episodes" className="btn btn-outline-primary mr-2">Episodes</Link>
                <Link to="/locations" className="btn btn-outline-success mr-2">Locations</Link>
                
                <div className="btn-group">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Favorites <span className="badge badge-light">{favorites.length}</span>
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                        {favorites.length === 0 ? (
                            <span className="dropdown-item">Empty</span>
                        ) : (
                            favorites.map((fav, index) => (
                                <div key={index} className="d-flex align-items-center justify-content-between px-2">
                                    <Link to={`/character/${fav.id}`} className="dropdown-item">
                                        {fav.name}
                                    </Link>
                                    <i 
                                        className="fas fa-trash-alt text-danger" 
                                        style={{cursor: 'pointer'}}
                                        onClick={() => dispatch({ type: 'remove_favorite', payload: fav })}
                                    ></i>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};