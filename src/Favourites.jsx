import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import { getStoredFavourites } from "./utils";
import ImagesFeedList from "./ImagesFeedList";

const Favourites = () => {
  const storedFavourites = getStoredFavourites();
  const [images, setFavouriteImages] = useState(storedFavourites);

  const handleFavoritesChange = (ims) => {
    setFavouriteImages(ims.filter((i) => i.liked));
  };

  if (!images.length) return (
    <div className="favourites-feed--no-content">
      <h2>No items left</h2>
      <Button className="images-feed__manage-favourite-button" variant="text">
        <Link to="/">Back to Search?</Link>
      </Button>
    </div>
  );
  return (
    <ImagesFeedList
      images={images}
      onFavoritesChange={handleFavoritesChange}
    />
  );
};

export default Favourites;