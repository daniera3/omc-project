import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Home, Favorites, Login, Register, NotFound, Profile, UserPanel } from "./pages";
import { ThemeProvider } from "./theme";
import NavBar from "./components/NavBar";
import history from "./utils/history";
import { userStore } from "./stores";
import { loginUserSessien } from "./actions/userActions";
import { isAdmin } from "./hooks/useUserFetch";
import Spinner from "./components/Spinner";


const PrivateRoute = ({ component: Component }) => (
  <Route render={props => {
    return (userStore.getUser() !== null
      ? (<Component  {...props} />)
      : <Redirect to={{ pathname: '/login' }} />)
  }
  }
  />
)

const UserRoute = ({ component: Component }) => (
  <Route render={props => {
    return (userStore.getUser() === null
      ? (<Component  {...props} />)
      : <Redirect to={{ pathname: '/' }} />)
  }
  }
  />
)


const AdminRoute = ({ component: Component }) => {

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

      return admin;
    }
    }
    />
  )
}


const AppRouter = () => {


  useEffect(() => {
    if (!userStore.getUser()) {
      loginUserSessien();
    }
  }, [])

  return (
    <ThemeProvider>
      <Router history={history}>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/favorites" component={Favorites} />
          <PrivateRoute path="/profile" component={Profile} />
          <AdminRoute path="/user" component={UserPanel} />
          <UserRoute path="/login" component={Login} />
          <UserRoute path="/register" component={Register} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
