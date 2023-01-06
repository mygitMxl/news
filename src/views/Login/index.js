import React from 'react'
import ReactCanvasNest from 'react-canvas-nest'
import { Form, Button, Input, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.css'
import axios from 'axios';
export default function index(props) {
  const onFinish = (values) => {
    console.log(values)

    axios.get(`users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then(res=>{
        console.log(res.data)
        if(res.data.length===0){
            message.error("用户名或密码不匹配")
        }else{
            localStorage.setItem("token",JSON.stringify(res.data[0]))
            props.history.push("/")
        }
    })
}
  return (
    <div style={{ background: 'rgba(35,39,65)', height: '100%' }}>
      <ReactCanvasNest /* 粒子效果 */
	    className='canvasNest'
        config={{
	        pointColor: ' 255, 255, 255 ',
	        lineColor: '255,255,255',
	        pointOpacity: 0.5,
	        pointR: 2,
	        count:100,
    	}}
        style={{ zIndex: 1 }}
    />
      <div className='formContainer'>
        <div className='logintitle'>全球新闻发布系统</div>

        <Form
          name="normal_login"
          className="login-form"
          onFinish={onFinish}/* 点击确定时触发,获取表单信息 */
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
