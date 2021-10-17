import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Home, Favorites, Login, Register } from "./pages";
import { ThemeProvider } from "./theme";
import NavBar from "./components/NavBar";
import history from "./utils/history";
import { userStore } from "./stores"

const PrivateRoute = ({ component: Component }) => (
  <Route render={props => {
    return (userStore.getUser() !== null
      ? (<Component  {...props} />)
      : <Redirect to={{ pathname: '/login' }} />)
  }
  }
  />
)



const AppRouter = () => {
  return (
    <ThemeProvider>
      <Router history={history}>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/favorites" component={Favorites} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
