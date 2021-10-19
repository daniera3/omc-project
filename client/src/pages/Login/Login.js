
import React, { useState, useEffect } from "react";
import InputText from "../../components/InputText";
import InputPassword from "../../components/InputPassword";
import Text from "../../components/Text";
import * as S from "./style";
import Button from "../../components/Button";
import { userLogin } from "../../actions/userActions";
import { userStore } from "../../stores";
import history from "../../utils/history";

const Login = () => {


  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [massage, setMassage] = useState('')



  const onChange = () => {
    setPassword('');
    setUsername('');
    setMassage(userStore.getMassege());
    if (userStore.getUser() !== null) {
      alert('you`r signIn');
      history.push('/');
    }
  }


  useEffect(() => {
    userStore.addChangeListener(onChange);
    if (userStore.getUser() !== null) {
      history.push('/');
    }
    return () => {
      userStore.removeChangeListener(onChange);
    }
  }, []);


  const handelClick = () => {

    if (username === '') {
      setMassage("Username field cannot be empty");
    } else if (password.length < 7) {
      setMassage("Password length can not be less than 7 ");
    }
    else {
      const data = { 'username': username, 'password': password };
      userLogin(data);

    }
  }


  return (

    <S.Content>
      <S.Header>
        <Text size="64px" bold>
          Login
        </Text>
      </S.Header>
      <S.Form className='form-group'>
        <Text color='red' bold>{massage} </Text>
        <InputText label='Username' val={username} onChange={setUsername} />
        <InputPassword value={password} onChange={setPassword} />
        <Button label="Login" color="primary" onClick={handelClick} />
      </S.Form>
    </S.Content>
  );
};

export default Login;
