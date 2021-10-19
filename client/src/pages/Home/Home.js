import React, { useState, useEffect } from "react";
import Text from "../../components/Text";
import UserList from "../../components/UserList";
import { usePeopleFetch } from "../../hooks";
import { favoriteStore } from "../../stores";

import * as S from "./style";




const Home = () => {
  const { users, isLoading, fetchUsersAdd } = usePeopleFetch();
  const [favorites, setFavorits ] = useState(favoriteStore.getFavoritesArray())


  const onChange = () => {
    setFavorits(favoriteStore.getFavoritesArray());
  }


  useEffect(() => {
    favoriteStore.addChangeListener(onChange);
    return () => {
      favoriteStore.removeChangeListener(onChange);
    }
  }, []);


  const handleScroll = e => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      fetchUsersAdd();
    }

  }

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList users={users} isLoading={isLoading} favorites={favorites} handleScroll={handleScroll} />
      </S.Content>
    </S.Home>
  );
};

export default Home;

