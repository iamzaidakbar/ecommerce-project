import "./Favourites.scss";
import React, { useEffect, useState } from 'react';
import Showcase from '../Showcase/Showcase';
import NoResults from "../NoResults/NoResults";

const Favourites = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [favourites, setFavourites] = useState([]);

  const title_1 = "SAVE YOUR FAVOURITE ITEMS"
  const title_2 = "Want to save the items that you love? Just click on the heart symbol beside the item and it will show up here. Browse now"

  const title_3 = 'SORRY, YOU ARE NOT LOGGED IN.'
  const title_4 = "Want to see the items that you love? Just login on the user symbol above and it will show up here. THANK YOU."

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

      {localStorage.getItem('token')
        ? favourites && favourites.length > 0 ? (
          <Showcase title={'Favourites'} products={favourites} isLoading={isLoading} />
        ) : (
          <NoResults title_1={title_1} title_2={title_2} route={'/store'} />
        )
        : <NoResults title_1={title_3} title_2={title_4} route={'/store'} />
      }
    </div>
  );
};

export default Favourites;
