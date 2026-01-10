/**
 * Servicio para interactuar con la API de Los Simpsons.
 * Documentación: https://thesimpsonsapi.com/
 */

const API_URL = "https://thesimpsonsapi.com/api";

/**
 * Obtiene personajes de la API.
 */
export const getCharacters = async () => {
  try {
    const response = await fetch(`${API_URL}/characters?limit=50`);
    if (!response.ok) {
        throw new Error(`Error fetching characters: ${response.statusText}`);
    }
    const data = await response.json();
    
    // La API devuelve { results: [...] }
    const results = data.results || [];

    // Mapear al formato que espera la app
    return results.map(item => ({
        character: item.name,
        // Uso de CDN oficial según documentación: https://cdn.thesimpsonsapi.com/500/character/{id}.webp
        image: `https://cdn.thesimpsonsapi.com/500/character/${item.id}.webp`,
        quote: item.phrases && item.phrases.length > 0 ? item.phrases[Math.floor(Math.random() * item.phrases.length)] : "No quote available.",
        characterDirection: "Right",
        id: item.id.toString(),
    }));

  } catch (error) {
    console.error("Error in getCharacters:", error);
    return [];
  }
};

/**
 * Obtiene lista de episodios de la API.
 */
export const getEpisodes = async () => {
    try {
        const response = await fetch(`${API_URL}/episodes?limit=50`);
        if (!response.ok) throw new Error("Error fetching episodes");
        const data = await response.json();
        const results = data.results || [];
        
        return results.map(ep => ({
            ...ep,
            // Uso de CDN oficial: https://cdn.thesimpsonsapi.com/200/episode/{id}.webp
            image: `https://cdn.thesimpsonsapi.com/200/episode/${ep.id}.webp`
        }));
    } catch (error) {
        console.error("Error in getEpisodes:", error);
        return [];
    }
};

/**
 * Obtiene lista de ubicaciones de la API.
 */
export const getLocations = async () => {
    try {
        const response = await fetch(`${API_URL}/locations?limit=50`);
        if (!response.ok) throw new Error("Error fetching locations");
        const data = await response.json();
        const results = data.results || [];
        
        return results.map(loc => ({
            ...loc,
            // Uso de CDN oficial: https://cdn.thesimpsonsapi.com/1280/location/{id}.webp (o 500 para cards)
            // Usaremos 500 para la vista de lista para optimizar carga
            image: `https://cdn.thesimpsonsapi.com/500/location/${loc.id}.webp` 
        }));
    } catch (error) {
        console.error("Error in getLocations:", error);
        return [];
    }
};
