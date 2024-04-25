import "./Favourites.scss";
import React, { useEffect, useState } from 'react';
import Showcase from '../Showcase/Showcase';
import NoResults from "../NoResults/NoResults";

const Favourites = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [favourites, setFavourites] = useState([]);
  const favouritesFromStorage = JSON.parse(localStorage.getItem("wishlist")) || [];

  const title_1 = "SAVE YOUR FAVOURITE ITEMS"
  const title_2 = "Want to save the items that you love? Just click on the heart symbol beside the item and it will show up here. Browse now"

  useEffect(() => {
    setIsLoading(true);
    setFavourites(favouritesFromStorage);
    setIsLoading(false);
  }, [favouritesFromStorage]);

  return (
    <div className="favourites">
      <h2 className="title">Favourites</h2>

      {favourites && favourites.length > 0 ? (
        <Showcase title={'Favourites'} products={favourites} isLoading={isLoading} />
      ) : (
        <NoResults title_1={title_1} title_2={title_2} route={'/store'} />
      )}
    </div>
  );
};

export default Favourites;
