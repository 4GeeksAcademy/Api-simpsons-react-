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
 * Datos simulados (Mock) para Episodios dado que la API no los proporciona.
 */
export const getEpisodes = async () => {
  // Simulando llamada a API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Simpsons Roasting on an Open Fire",
          season: 1,
          episode: 1,
          airJava: "1989-12-17",
        },
        {
          id: 2,
          title: "Bart the Genius",
          season: 1,
          episode: 2,
          airDate: "1990-01-14",
        },
        {
          id: 3,
          title: "Homer's Odyssey",
          season: 1,
          episode: 3,
          airDate: "1990-01-21",
        },
        {
          id: 4,
          title: "There's No Disgrace Like Home",
          season: 1,
          episode: 4,
          airDate: "1990-01-28",
        },
        {
          id: 5,
          title: "Bart the General",
          season: 1,
          episode: 5,
          airDate: "1990-02-04",
        },
        {
          id: 6,
          title: "Moaning Lisa",
          season: 1,
          episode: 6,
          airDate: "1990-02-11",
        },
      ]);
    }, 500);
  });
};

/**
 * Datos simulados (Mock) para Ubicaciones dado que la API no los proporciona.
 */
export const getLocations = async () => {
  // Simulando llamada a API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Springfield Nuclear Power Plant", type: "Lugar de Trabajo" },
        { id: 2, name: "Moe's Tavern", type: "Bar" },
        { id: 3, name: "Springfield Elementary School", type: "Escuela" },
        { id: 4, name: "742 Evergreen Terrace", type: "Casa" },
        { id: 5, name: "Kwik-E-Mart", type: "Tienda de Conveniencia" },
        { id: 6, name: "Krusty Burger", type: "Restaurante" },
      ]);
    }, 500);
  });
};
