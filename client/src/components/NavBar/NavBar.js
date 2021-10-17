import React, { useState,useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";
import { userStore } from "../../stores";
import { userLogout,loginUserSessien } from "../../actions/userActions";


const NavBar = () => {
  const [value, setValue] = useState(0);
  const [login, setLogin] = useState(false)
  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };


  const onChange = () => {
    userStore.getUser()?
    setLogin(true)
    :setLogin(false)
    
  }

  const logout = ()=>{
    userLogout();
  }


  useEffect(() => {
    userStore.addChangeListener(onChange);
    if(! userStore.getUser())
    {
      loginUserSessien();
    }
    return () => {
      userStore.removeChangeListener(onChange);
    }
  }, []);





  const LinkStyle = {
    color: "#84ffff",
    borderBottom: "none",
    textDecoration: 'none'
  }

  return (
    <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        <Link to="/" style={LinkStyle} onClick={() => { handleChange(null, 0) }} >
          <Tab label="Home" index={0} />
        </Link>
        <Link to="/favorites" style={LinkStyle} onClick={() => { handleChange(null, 1) }} >
          <Tab label="Favorites" index={1} />
        </Link>
        {!login &&
        <Link to="/register" style={LinkStyle} onClick={() => { handleChange(null, 2) }} >
          <Tab label="Register" index={2} />
        </Link>
        }
        {!login ?
        <Link to="/login" style={LinkStyle} onClick={() => { handleChange(null, 3) }} >
          <Tab label="Login" index={3} />
        </Link>
          :
          <Link  style={LinkStyle} onClick={() => { logout() }} >
            <Tab label="Logout" index={4} />
          </Link>
        }




      </Tabs>
    </AppBar>
  );
};

export default NavBar;
