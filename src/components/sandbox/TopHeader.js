import React, { useState } from 'react'
import { Layout, Dropdown,Menu ,Avatar} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined
} from '@ant-design/icons';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';

const { Header } = Layout;

function TopHeader(props) {
    const changeCollapsed = () => {
        props.dispatch({type:'change_collapsed'})
    }
  console.log(props);
     const {role:{roleName},username}=JSON.parse(localStorage.getItem('token'))
     /* role:{roleName}是role里面的roleName,嵌套了一层*/
    const menu = (
        <Menu>
            <Menu.Item>
                {roleName}
            </Menu.Item>
            <Menu.Item danger onClick={()=>{
                localStorage.removeItem("token")
                // console.log(props.history)
                props.history.replace("/login")
            }}>退出</Menu.Item>
        </Menu>
    );

    return (
        <Header className="site-layout-background" style={{ padding: '0 16px' }}>
            {
               props.iscollapesed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed} />
            }

            <div style={{ float: "right" }}>
                <span>欢迎<span style={{color:"blueviolet"}}>{username}</span>回来</span>
                <Dropdown overlay={menu}>
                    <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
            </div>
        </Header>

    )
}
const mapStateToProps=(state)=>{
  return{
    iscollapesed:state.counter.iscollapesed
  }
}
export default  connect(mapStateToProps,null) (withRouter(TopHeader))