import React, { useEffect, useState } from "react";
import Text from "../../components/Text";
import Spinner from "../../components/Spinner";
import CheckBox from "../../components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { changeFavorite } from "../../actions/favoriteActions";
import * as S from "./style";


const UserList = ({ users, isLoading, favorites, handleScroll }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [selectCountrys, setselectCountrys] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(users);
  const countrys = Array.from(new Set(users.map(user => user.location.country)));

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const handleCheck = country => {
    if (selectCountrys.indexOf(country) !== -1)
      setselectCountrys(selectCountrys.filter(selectCountry => selectCountry !== country));
    else
      setselectCountrys([...selectCountrys, country]);
  }

  const handleClick = (index) => {
    changeFavorite(selectedUsers[index]);
  }


  useEffect(() => {
    if (selectCountrys && users && !selectCountrys.length)
      setSelectedUsers(users);
    else
      setSelectedUsers(users.filter(user => selectCountrys.includes(user.location.country)))
  }
    , [selectCountrys, users])

  return (
    <S.UserList>
      <S.Filters>
        {/* <CheckBox value="BR" label="Brazil" />
        <CheckBox value="AU" label="Australia" />
        <CheckBox value="CA" label="Canada" />
        <CheckBox value="DE" label="Germany" /> */}
        {countrys.map((country, index) => {
          return (<CheckBox key={index} value={country} label={country} onChange={handleCheck} />)
        })
        }
      </S.Filters>
      <S.List onScroll={handleScroll}>
        {selectedUsers.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user.name.title} {user.name.first} {user.name.last}
                </Text>
                <Text size="14px">{user.email}</Text>
                <Text size="14px">
                  {user.location.street.number} {user.location.street.name}
                </Text>
                <Text size="14px">
                  {user.location.city} {user.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper onClick={() => { handleClick(index) }} isVisible={index === hoveredUserId || (favorites && favorites.indexOf(user) !== -1)}>
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
