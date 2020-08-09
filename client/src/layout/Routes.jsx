import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar } from "./Navbar";
import { About } from "../components/pages/About";
import { Home } from "../components/pages/Home";

export const Routes = () => (
    <BrowserRouter>
        <React.Fragment>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
            </Switch>
        </React.Fragment>
    </BrowserRouter>
);


