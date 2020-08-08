import React from "react";
import ReactDOM from "react-dom";
import App from "../src/components/App";
import Register from "../src/components/Register";
import Login from "../src/components/Login";
import Home from "./components/Home";
import { createBrowserHistory } from "history";
import { Switch, Route, Router } from "react-router";

const routes = [
    {
        path: "/about",
        component: App,
        name: "About-Page"
    },
    {
      path: "/register",
      component: Register,
      name: "Register-Page"
    },
    {
      path: "/home",
      component: Home,
      name: "Home-Page"
    },
    {
        path: "/",
        component: Login,
        name: "Main-Page"
    }
]
const root = document.getElementById("root");
const hist = createBrowserHistory();
ReactDOM.render(<Router history={hist}>
        <Switch>
            {
                routes.map((route)=>{
                    return(
                        <Route path={route.path} component={route.component} key={route.name}></Route>
                    )
                })
            }
        </Switch>
    </Router>, root);