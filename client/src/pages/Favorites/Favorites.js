import React, { useState, useEffect } from "react";
import Text from "../../components/Text";
import UserList from "../../components/UserList";
import { favoriteStore } from "../../stores";
import { UpdateFavorites } from "../../actions/favoriteActions";
import * as S from "./style";

const Favorites = () => {




  const [favorites, setFavorits ] = useState();



  const onChange = () => {
    setFavorits(favoriteStore.getFavoritesArray());
  }


  useEffect(() => {
    favoriteStore.addChangeListener(onChange);
    if (!favorites) {
      setFavorits(favoriteStore.getFavoritesArray());
    }
    return () => {
      favoriteStore.removeChangeListener(onChange);
    }
  }, []);


  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Favorites
          </Text>
        </S.Header>
        <UserList users={favorites || []} isLoading={false} favorites={favorites||[]} />
      </S.Content>
    </S.Home>
  );
};

export default Favorites;
