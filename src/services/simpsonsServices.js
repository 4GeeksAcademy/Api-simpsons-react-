/**
 * Servicio para interactuar con la API de Los Simpsons.
 * Documentación: https://thesimpsonsapi.com/
 */

const API_URL = "https://thesimpsonsapi.com/api";

/**
 * Obtiene citas/personajes de la API.
 * Dado que la API se basa en citas, obtenemos un gran número y deduplicamos personajes.
 * @returns {Promise<Array>} Lista de personajes con imagen y nombre.
 */
export const getCharacters = async () => {
  try {
    // Obtener suficientes citas para tener una buena variedad de personajes
    const response = await fetch(`${API_URL}/quotes?count=50`);
    if (!response.ok) {
      throw new Error(`Error fetching characters: ${response.statusText}`);
    }
    const data = await response.json();

    // Deduplicar personajes basado en el nombre del 'character'
    const uniqueCharacters = [];
    const seen = new Set();

    data.forEach((item) => {
      if (!seen.has(item.character)) {
        seen.add(item.character);
        uniqueCharacters.push({
          character: item.character,
          image: item.image,
          quote: item.quote,
          characterDirection: item.characterDirection,
          // Generar ID consistente para enrutamiento
          id: item.character.toLowerCase().replace(/\s+/g, "-"),
        });
      }
    });

    return uniqueCharacters;
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
    // La API devuelve un objeto con la propiedad 'results'
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
        // La API devuelve un objeto con la propiedad 'results'
        return data.results || [];
    } catch (error) {
        console.error("Error in getLocations:", error);
        return [];
    }
};
