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

    // Mapeo de personajes a sus imágenes locales
    const characterImages = {
        "Homer Simpson": "/assets/homer.png",
        "Marge Simpson": "/assets/marge.png",
        "Bart Simpson": "/assets/bart.png",
        "Lisa Simpson": "/assets/lisa.png",
        "Maggie Simpson": "/assets/maggie.png"
    };

    // Mapear al formato que espera la app
    return results.map(item => ({
        character: item.name,
        // Usar imagen local si existe, sino generic.png
        image: characterImages[item.name] || "/assets/generic.png", 
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
    return data.results || []; 
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
            // Usar placeholder dinámico para ubicaciones ya que las imágenes de la API fallan
            image: `https://placehold.co/600x400/87CEEB/ffffff?text=${encodeURIComponent(loc.name)}`
        }));
    } catch (error) {
        console.error("Error in getLocations:", error);
        return [];
    }
};
