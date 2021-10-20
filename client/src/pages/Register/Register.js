/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import InputText from "../../components/InputText";
import InputPassword from "../../components/InputPassword";
import Text from "../../components/Text";
import * as S from "./style";
import Button from "../../components/Button";
import { userStore } from "../../stores";
import { userRegister } from "../../actions/userActions";
import { useHistory } from "react-router-dom";

const Register = () => {

  const history = useHistory();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [massage, setMassage] = useState('')


  const onChange = () => {
    setPassword('');
    setConfirmPassword('');
    setUsername('');
    setMassage(userStore.getMassege());
    if (userStore.getUser() !== null) {
      alert('you`r signUp and singIn');
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
    if (password !== confirmPassword) {
      setMassage("Password not equile to confirm password");
      setPassword('');
      setConfirmPassword('');
    }
    else if (username === '') {
      setMassage("Username field cannot be empty");
    } else if (password.length < 7) {
      setMassage("Password length can not be less than 7 ");
    }
    else {
      const data = { 'username': username, 'password': password };
      userRegister(data);

    }


  }


  return (

    <S.Content>
      <S.Header>
        <Text size="64px" bold>
          Register
        </Text>
      </S.Header>
      <S.Form className='form-group'>
        <Text color='red' bold>{massage} </Text>
        <InputText label='Username' val={username} onChange={setUsername} />
        <InputPassword value={password} onChange={setPassword} id='password' />
        <InputPassword value={confirmPassword} onChange={setConfirmPassword} label="Confirm Password" id='cPassword' />
        <Button label="Register" color="primary" onClick={handelClick} />
      </S.Form>
    </S.Content>
  );
};

export default Register;