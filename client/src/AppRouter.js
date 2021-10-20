import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Home, Favorites, Login, Register, NotFound, Profile, UserPanel } from "./pages";
import { ThemeProvider } from "./theme";
import NavBar from "./components/NavBar";
import { userStore } from "./stores";
import { loginUserSessien } from "./actions/userActions";
import { isAdmin } from "./hooks/useUserFetch";
import Spinner from "./components/Spinner";


const PrivateRoute = ({ component: Component, setValue }) => (
  <Route render={props => {
    userStore.getUser() !== null
      ? setValue()
      : setValue(0)
    return (userStore.getUser() !== null
      ? (<Component  {...props} />)
      : <Redirect to={{ pathname: '/login' }} />)
  }
  }
  />
)

const UserRoute = ({ component: Component, setValue }) => (
  <Route render={props => {
    userStore.getUser() === null
      ? setValue()
      : setValue(0)
    return (userStore.getUser() === null
      ? (<Component  {...props} />)
      : <Redirect to={{ pathname: '/' }} />)
  }
  }
  />
)


const AdminRoute = ({ component: Component, setValue }) => {

  const [admin, setAdmin] = useState(<Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />);
  useEffect(() => {
    isAdmin().then(
      response => {
        if (response.data['success'] === true) {

          setAdmin(<Component {...(response.data)} />)
        }
        else {
          alert('you not un admin goodbye :P');
          setAdmin(<Redirect to={{ pathname: '/' }} />)
        }
      })
      .catch((e) => {
        alert('you not un admin goodbye :P');

        setAdmin(<Redirect to={{ pathname: '/' }} />)
      }
      )
  }, [])
  return (
    <Route render={() => {
      admin === <Redirect to={{ pathname: '/' }} />
        ? setValue(0)
        : setValue()
      return admin;
    }
    }
    />
  )
}


const AppRouter = () => {

  const [value, setValue] = useState(0);

  const urlSwitch = () => {
    switch (window.location.pathname) {
      case '/':
        return 0;
      case '/favorites':
        return 1;
      case '/profile':
        return 2;
      case '/user':
        return 3;
      case '/register':
        return 2;
      case '/login':
        return 3;
      default:
        return 0;
    }
  }

  useEffect(() => {
    urlSwitch();
    if (!userStore.getUser()) {
      loginUserSessien();
    }
  }, [])

  return (
    <ThemeProvider >
      <Router >
        <NavBar value={value} />
        <Switch  >
          <Route exact path="/" render={() => { setValue(0); return <Home /> }} />
          <PrivateRoute path="/favorites" setValue={(e) => setValue(e || 1)} component={Favorites} />
          <PrivateRoute path="/profile" setValue={(e) => setValue(e || 2)} component={Profile} />
          <AdminRoute path="/user" setValue={(e) => setValue(e || 3)} component={UserPanel} />
          <UserRoute path="/register" setValue={(e) => setValue(e || 2)} component={Register} />
          <UserRoute path="/login" setValue={(e) => setValue(e || 3)} component={Login} />
          <Route render={() => { setValue(0); return <NotFound /> }} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
