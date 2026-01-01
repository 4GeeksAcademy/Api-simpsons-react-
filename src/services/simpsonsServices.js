/**
 * Service to interact with The Simpsons API.
 * Documentation: https://thesimpsonsapi.com/
 */

const API_URL = "https://thesimpsonsapi.com/api";

/**
 * Fetches quotes/characters from the API.
 * Since the API is quote-based, we fetch a large number and deduplicate characters.
 * @returns {Promise<Array>} List of characters with image and name.
 */
export const getCharacters = async () => {
  try {
    // Fetch enough quotes to get a good variety of characters
    const response = await fetch(`${API_URL}/quotes?count=50`);
    if (!response.ok) {
      throw new Error(`Error fetching characters: ${response.statusText}`);
    }
    const data = await response.json();

    // Deduplicate characters based on 'character' name
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
          // Generator consistent ID for routing
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
 * Mock data for Episodes since the API doesn't provide them.
 */
export const getEpisodes = async () => {
  // Simulating API call
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
 * Mock data for Locations since the API doesn't provide them.
 */
export const getLocations = async () => {
  // Simulating API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Springfield Nuclear Power Plant", type: "Workplace" },
        { id: 2, name: "Moe's Tavern", type: "Bar" },
        { id: 3, name: "Springfield Elementary School", type: "School" },
        { id: 4, name: "742 Evergreen Terrace", type: "House" },
        { id: 5, name: "Kwik-E-Mart", type: "Convenience Store" },
        { id: 6, name: "Krusty Burger", type: "Restaurant" },
      ]);
    }, 500);
  });
};
