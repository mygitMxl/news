import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Login from '../views/Login'
import NewSandBox from '../views/sandbox/NewSandBox'
export default function index() {
  return (
    <div>
        <HashRouter>
            <Switch>
          <Route path={'/'}render={()=>{
            return localStorage.getItem('token')?<NewSandBox/>:<Redirect to={'/login'}/>
          }}/>
          <Route path={'/login'} component={Login}/>
          </Switch>
        </HashRouter>
    </div>
  )
}
