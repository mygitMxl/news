import React,{useState,useEffect} from 'react'
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
  } from '@ant-design/icons';
  import './SideMenu.css'
import axios from 'axios';
const {  Sider } = Layout;

export default function SideMenu() {
  const [menu, setmenu] = useState([])
  useEffect(() => {
  axios.get('http://localhost:8000/rights?_embed=children')
  .then(res=>{
    console.log(res.data)
  })
  }, [])
  
  const renderMenu=()=>{

  }
    return (
        <Sider trigger={null} collapsible >
        <div style={{display:"flex",height:"100%","flexDirection":"column"}}>    {/* flexDirection===flex-Direction 设置滚动条 样式在APP.css中 */}
        <div className="logo">全球新闻管理系统</div>
        <div style={{flex:1,overflow:'auto'}}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        {renderMenu(menu)}   
        </Menu>
        </div>
        </div>
      </Sider>
    )
}
