import { Layout } from 'antd'
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import Home from './home/home'
import Nopermission from './nopermission/Nopermission'
import RightList from './right-manage/RightList'
import RoleList from './right-manage/RoleList'
import UserList from './user-manage/userList'
import './NewsSandBox.css'
const { Content } = Layout;
export default function NewSandBox() {
    return (
            <Layout style={{position:'top:0 bottom:0 left:0 right:0 '}}>
                <SideMenu />
                <Layout className="site-layout">
                    <TopHeader />
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            overflow:"auto"
                        }}
                    >
                        <Switch>
                            <Route path="/home" component={Home} />
                            <Route path="/user-manage/list" component={UserList} />
                            <Route path="/right-manage/role/list" component={RoleList} />
                            <Route path="/right-manage/right/list" component={RightList} />
                            <Redirect from={'/'} to="/home" exact />
                            <Route component={Nopermission} />
                        </Switch>
                    </Content>
                </Layout>

            </Layout>
    )
}
