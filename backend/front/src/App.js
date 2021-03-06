import React, {useState} from "react";
import "./App.css";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import NavigationBar from "./components/NavigationBar";
import Login from "./components/Login";
import Home from "./components/Home";
import Utils from "./utils/Utils";
import {connect} from "react-redux";
import CountryListComponent from "./components/CountryListComponent";
import SideBar from "./components/SideBar"
import CountryComponent from "./components/CountryComponent";


const AuthRoute = props => {
    let user = Utils.getUserName();
    if (!user) return <Redirect to={"/login"}/>;
    return <Route {...props}/>;
};

const history = createBrowserHistory();

function App(props) {
    const [exp, setExpanded] = useState(false);

  return (
    <div className="App">
      <Router history={ history }>
          <NavigationBar toggleSideBar={()=> setExpanded(!exp)}/>
          <div className="wrapper">
              <SideBar expanded={exp}/>
              <div className="container-fluid">
              {props.error_message &&
              <div className="alert alert-danger m-1">{props.error_message}</div>
              }
              <Switch>
                  <AuthRoute path="/home/" exact component={Home}/>
                  <AuthRoute path="/countries" exact component={CountryListComponent}/>
                  <AuthRoute path="/countries/:id" exact component={CountryComponent}/>
                  <Route path="/login" exact component={Login}/>
              </Switch>
              </div>
          </div>
      </Router>
    </div>
  );
}

function mapStateToProps(state) {
    const {msg} = state.alert;
    return {error_message: msg}
}

export default connect(mapStateToProps)(App);
