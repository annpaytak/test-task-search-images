import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { TextField, Button } from "@mui/material";

import ImagesFeedList from "./ImagesFeedList";
import {
  mergeFavouritesWithFetched,
  getStoredFavourites,
  fetchImages,
} from "./utils";

const App = () => {
  const [dataFetched, setDataFetched] = useState(false);
  const [search, setSearch] = useState("");
  const [images, setImages] = useState(null);

  const storedFavourites = getStoredFavourites();

  useEffect(() => {
    if (storedFavourites && images) {
      const updatedImages = mergeFavouritesWithFetched(
        storedFavourites,
        images
      );
      setImages(updatedImages);
    }
  }, [dataFetched]);

  const handleFavoritesChange = (favourites) => {
    const updatedImages = mergeFavouritesWithFetched(favourites, images);
    setImages(updatedImages);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (ev) => {
    if (ev.key === "Enter") {
      fetchImages(search)
        .then((data) => {
          setImages(data.hits);
          setDataFetched(true);
        })
        .catch((reason) => console.log(reason.message));
      ev.preventDefault();
    }
  };

  const imagesFeedClassName = classNames("images-feed", {
    "images-feed--no-content": !dataFetched,
  });

  return (
    <div className={imagesFeedClassName}>
      <TextField
        className="images-feed__search"
        variant="outlined"
        placeholder="Search"
        value={search}
        onChange={handleSearchChange}
        onKeyPress={(ev) => handleSearchSubmit(ev)}
      />
      <Button className="images-feed__manage-favourite-button" variant="text">
        <Link to="/favourite">Manage Favorites</Link>
      </Button>
      {images && (
        <ImagesFeedList
          images={images}
          onFavoritesChange={handleFavoritesChange}
        />
      )}
    </div>
  );
}

export default App;