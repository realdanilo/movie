import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import App from './App'
import Movie from './components/Movie'
import Liked from './components/Liked'

export default function Routes() {
    return (
        <div>
            <Switch>
                <Route exact={true} path="/" render={(rp) => <App {...rp} />} />
                <Route exact={true} path="/movie/:id" render={(rp) => <Movie id={rp.match.params.id} {...rp} />} />
                <Route exact={true} path="/liked" render={(rp) => <Liked />} />
                <Redirect to="/" />
            </Switch>
        </div>
    )
}
