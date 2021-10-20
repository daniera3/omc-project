/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Select from "../../components/Select";
import Text from "../../components/Text";
import * as S from "./style";
import Button from "../../components/Button";
import { getAllUsers, updateRole } from "../../hooks/useUserFetch";



const UserPanel = ({ token }) => {

  const permissionsOptions = [{ 'value': 'admin', 'label': 'Admin' }, { 'value': 'user', 'label': 'Regular' }];
  const [massage, setMassage] = useState('')
  const [userList, setUserList] = useState()
  const [parmission, setParmission] = useState('')
  const [selectedUser, setSelectedUser] = useState('')



  useEffect(() => {
    getAllUsers(token).then(response => {
      if (response.status === 200) {
        setUserList(response.data.map(e => {
          e['value'] = e['id'];
          e['label'] = e['username']
          return e;

        }));
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
  }, [token])

  useEffect(() => {
    if (userList) {
      let temp = userList.filter((user) => user['id'] === selectedUser)[0];
      setParmission(temp['role'])
    }

  }, [selectedUser])



  const handelClick = () => {
    const data = { 'id': selectedUser, 'role': parmission, 'token': token }
    updateRole(data).then(response => {

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
        <Text size="64px" color="#84ffff" bold>
          User Panel control
        </Text>
      </S.Header>
      <S.Form className='form-group'>
        <Text color='red' bold>{massage} </Text>
        <Select label='Users' options={userList} value={selectedUser} setValue={setSelectedUser} def={selectedUser} />
        <Select label='Permissions' options={permissionsOptions} value={parmission} setValue={setParmission} def={parmission} />
        <Button label="UserPanel" color="primary" onClick={handelClick} />
      </S.Form>

    </S.Content>
  );
};

export default UserPanel;