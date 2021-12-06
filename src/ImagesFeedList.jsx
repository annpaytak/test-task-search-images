import React from "react";
import {
  Card,
  CardMedia,
  CardActions,
  IconButton,
  colors,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { getStoredFavourites, updateStoredFavourites } from "./utils";

const ImagesFeedList = ({ images, onFavoritesChange }) => {
  const storedFavourites = getStoredFavourites() || [];

  const handleChange = (image) => {
    const isInFavourite =
      storedFavourites.filter((i) => i.id === image.id).length > 0;

    let filtered;
    if (isInFavourite) {
      filtered = storedFavourites.filter((i) => i.id !== image.id);
      onFavoritesChange([...filtered, { ...image, liked: false }]);
    } else {
      filtered = [...storedFavourites, { ...image, liked: true }];
      onFavoritesChange(filtered);
    }
    updateStoredFavourites(filtered);
  };

  return (
    <div className="images-feed__list">
      {images.map(({ id, webformatURL, tags, liked }) => (
        <Card
          key={id}
          className="images-feed__list__item images"
          sx={{ maxWidth: 345 }}
        >
          <CardMedia
            className="images__image"
            component="img"
            height="194"
            image={webformatURL}
            alt={tags}
          />
          <CardActions disableSpacing>
            <IconButton
              sx={{ marginLeft: "auto" }}
              className="images__favourite-button"
              onClick={() => handleChange({ id, webformatURL, tags, liked })}
              aria-label="add to favorites"
            >
              <FavoriteIcon
                sx={
                  liked
                    ? { color: colors.red["A200"] }
                    : { color: colors.grey[300] }
                }
              />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default ImagesFeedList;
