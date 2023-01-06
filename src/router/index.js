import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Login from '../views/Login/index'
import NewSandBox from '../views/sandbox/NewSandBox'
export default function index() {
  return (

        <HashRouter>
            <Switch>
           <Route path={'/login'} component={Login}/>
          <Route path={'/'}render={()=>{
            return localStorage.getItem('token')?<NewSandBox/>:<Redirect to={'/login'}/>
          }}/>
          </Switch>
        </HashRouter>
   
  )
}
