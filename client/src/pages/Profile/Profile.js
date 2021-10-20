import React, { useState, useEffect } from "react";
import Select from "../../components/Select";
import Text from "../../components/Text";
import * as S from "./style";
import Button from "../../components/Button";

import { getProfile, updateEmail } from "../../hooks/useUserFetch";
import InputText from "../../components/InputText";



const Profile = () => {


  const [massage, setMassage] = useState('')
  const [userList, setUserList] = useState()
  const [email, setEmail] = useState('')
  const [selectedUser, setSelectedUser] = useState('')


  useEffect(() => {
    getProfile().then(response => {
      if (response.status === 200) {
        let data = response.data;
        data['value'] = data['id'];
        data['label'] = data['username']
        setUserList([data]);
        setSelectedUser(data['value']);
        setEmail(data['email']);
        setMassage('');
      }
      else {
        setUserList();
        setMassage(response.data);
      }
    }
    ).catch(() => {
      setUserList();
      setMassage('');
    })
  }, [])

  const handelClick = () => {
    const data = { 'id': selectedUser, 'email': email }
    updateEmail(data).then(response => {
      if (response.status === 200) {
        setMassage('save');
      }
      else {
        setMassage(response.data['error'])
      }
    }).catch(() => {
      setMassage('Sorry, we cant save you`r changes');
    })
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
        <Select label='Users' options={userList} value={selectedUser} def={selectedUser} />
        <InputText onChange={setEmail} label='Email' val={email} type='email' />
        <Button label="Edit" color="primary" onClick={handelClick} />
      </S.Form>
    </S.Content>
  );
};

export default Profile;