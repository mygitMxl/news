import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
} from '@ant-design/icons';
import './SideMenu.css'
import axios from 'axios';
import SubMenu from 'antd/lib/menu/SubMenu';
import { withRouter } from 'react-router-dom';

const { Sider } = Layout;

function SideMenu(props) {
  const [menu, setMenu] = useState([])
  /* 获取数据 */
  useEffect(() => {
    axios.get('/rights?_embed=children').then(res => {/* 向下合并 */
      console.log(res.data);
      setMenu(res.data)
    })
  }, [])
  const {role:{rights}}=JSON.parse(localStorage.getItem('token'))
  /*  判断pagepermisson是否有*/
  const checkPagePermission = (item) => {
    return item.pagepermisson&&rights.includes(item.key)/* 当前登录用户,role中的rights包含item中的key也就是权限 */
  }
  /* iconlist 图标 */
  const iconList = {
    "/home": <UserOutlined />,
    "/user-manage": <UserOutlined />,
    "/user-manage/list": <UserOutlined />,
    "/right-manage": <UserOutlined />,
    "/right-manage/role/list": <UserOutlined />,
    "/right-manage/right/list": <UserOutlined />
    //.......
  }
  const renderMenu = (menuList) => {
    return menuList.map(item => {
      if (item.children?.length>0 && checkPagePermission(item)) {
        return <SubMenu key={item.key} title={item.title} icon={iconList[item.key]}>
          {renderMenu(item.children)}
        </SubMenu>
      }
      return checkPagePermission(item) && <Menu.Item key={item.key} icon={iconList[item.key]} onClick={() => {
        //  console.log(props)
        props.history.push(item.key)
      }}>{item.title}</Menu.Item>
    })
  }
  /* 高亮 */
 
  const selectKeys = [props.location.pathname]
  /* 默认展开 */
  const defaultOpenKeys= ['/'+props.location.pathname.split('/')[1]] /* 用于defaultOpenKeys,初始状态展开,只取一级路径 */
  return (
    <Sider trigger={null} collapsible >
      <div style={{ display: "flex", height: "100%", "flexDirection": "column" }}>    {/* flexDirection===flex-Direction ,column主轴变成垂直方向,设置滚动条 样式在APP.css中 */}
        <div className="logo">全球新闻管理系统</div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Menu theme="dark" mode="inline" selectedKeys={selectKeys} defaultOpenKeys={defaultOpenKeys}>{/* SelectedKeys选中谁谁高亮 */}
            {renderMenu(menu)}
          </Menu>
        </div>
      </div>
    </Sider>
  )
}
export default withRouter(SideMenu)