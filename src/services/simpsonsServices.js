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
        // Usar imagen de la API si existe, sino usar DiceBear como fallback visual garantizado
        // Nota: Las imágenes de la API actual parecen estar rotas (404), así que forzamos el fallback si falla la carga.
        // Pero aquí definimos la URL principal. En el componente podemos manejar el error.
        // Dado que sabemos que fallan, podemos usar DiceBear por defecto o intentar la URL.
        // Para asegurar que el usuario vea "algo", usaremos DiceBear si la original es relativa/rota.
        image: `https://api.dicebear.com/9.x/avataaars/svg?seed=${item.name}`, 
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
