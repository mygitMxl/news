import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Login from '../views/Login/index'
import NewSandBox from '../views/sandbox/NewSandBox'
import News from '../views/news/News'
import Detail from '../views/news/Detail'
export default function index() {
  return (
        <HashRouter>
            <Switch>
           <Route path={'/login'} component={Login}/>
           <Route path="/news" component={News}/>
          <Route path="/detail/:id" component={Detail}/>
          <Route path={'/'}render={()=>{
            return localStorage.getItem('token')?<NewSandBox/>:<Redirect to={'/login'}/>
          }}/>
         
          </Switch>
        </HashRouter>
   
  )
}
