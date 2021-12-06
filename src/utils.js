import constants from "./constants";

export const mergeFavouritesWithFetched = (favourites, fetched) => {
    if (!fetched || !favourites) return;

    let { id, ...image } = favourites;

    const byId = new Map();
    for (const { id, ...favourite } of favourites) {
      const favourites = byId.get(id);
      if (favourites) {
        favourites.push(favourite);
      } else {
        byId.set(id, [favourite]);
      }
    }
    const updatedImages = [];
    for (const favourite of fetched) {
      for (const image of byId.get(favourite.id) || [favourite]) {
        updatedImages.push({ ...favourite,  ...image });
      }
    }
    return updatedImages;
};

export const fetchImages = async (searchParam) => {
  const url = `https://pixabay.com/api/?key=${constants.API_KEY}&q=${searchParam}&image_type=photo`;
  let response = await fetch(url);
  let data = await response.json();
  return data;
};

export const updateStoredFavourites = (favourites) => {
  return localStorage.setItem(constants.LOCAL_STORAGE_KEY, JSON.stringify(favourites));
}

export const getStoredFavourites = () => {
  const favourites = localStorage.getItem(constants.LOCAL_STORAGE_KEY);
  return JSON.parse(favourites);
}

