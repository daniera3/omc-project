import React, { useState, useEffect } from "react";
import Select from "../../components/Select";
import Text from "../../components/Text";
import * as S from "./style";
import Button from "../../components/Button";



const Profile = () => {

  const  permissionsOptions= [{'value':'admin','label':'Admin'},{'value':'user','label':'Regular'}];
  const [massage, setMassage] = useState('')

  const handelClick=()=>{

  }


  return (

    <S.Content>
      <S.Header>
        <Text size="64px" bold>
          profile
        </Text>
      </S.Header>
      <S.Form className='form-group'>
        <Text color='red' bold>{massage} </Text>
        <Select label='Users'  />
        <Select label='Permissions' options={permissionsOptions} />
        <Button label="Eddit" color="primary" onClick={handelClick} />
      </S.Form>
    </S.Content>
  );
};

export default Profile;