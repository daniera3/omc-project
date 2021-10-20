import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";
import { userStore } from "../../stores";
import { userLogout } from "../../actions/userActions";


const NavBar = ({value,}) => {
  
  const [login, setLogin] = useState(false)



  const onChange = () => {
    userStore.getUser() ?
      setLogin(true)
      : setLogin(false)

  }

  const logout = () => {
    userLogout();
  }


  useEffect(() => {
    userStore.addChangeListener(onChange);
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
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        <Link to="/" style={LinkStyle}  >
          <Tab label="Home" index={0} />
        </Link>
        <Link to="/favorites" style={LinkStyle}  >
          <Tab label="Favorites" index={1} />
        </Link>
        {login &&
          <Link to="/profile" style={LinkStyle}  >
            <Tab label="Profile" index={2} />
          </Link>
        }
        {!login ?
          <Link to="/register" style={LinkStyle}  >
            <Tab label="Register" index={4} />
          </Link>
          :
          <Link to="/user" style={LinkStyle}  >
            <Tab label="User Panel" index={3} />
          </Link>
        }
        {!login ?
          <Link to="/login" style={LinkStyle}  >
            <Tab label="Login" index={5} />
          </Link>
          :
          <Link to='/' style={LinkStyle} onClick={() => { logout() }} >
            <Tab label="Logout" />
          </Link>
        }




      </Tabs>
    </AppBar>
  );
};

export default NavBar;
