import "./Favourites.scss";
import React, { useEffect, useState } from 'react';
import Showcase from '../Showcase/Showcase';
import NoResults from "../NoResults/NoResults";

const Favourites = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [favourites, setFavourites] = useState([]);
  
  const title_1 = "SAVE YOUR FAVOURITE ITEMS"
  const title_2 = "Want to save the items that you love? Just click on the heart symbol beside the item and it will show up here. Browse now"

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsLoading(true);
      const favouritesFromStorage = JSON.parse(localStorage.getItem("wishlist")) || [];
      setFavourites(favouritesFromStorage);
      setIsLoading(false);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

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
