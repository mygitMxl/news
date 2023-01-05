import React, { forwardRef ,useState,useEffect} from 'react'
import { Form, Input, Select } from 'antd'
const { Option } = Select;
 const UserForm=forwardRef((props,ref)=>{
    let { regionList, roleList } = props
    const [isDisable, setisDisabled] = useState(false)
    useEffect(() => {
        setisDisabled(props.isUpdateDisabled)
    }, [props.isUpdateDisabled])
    
    return (
        <Form  layout="vertical"  ref={ref}>
            <Form.Item
                name="username"
                label="用户名"
                rules={[{ required: true, message: 'Please input the title of collection!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
                rules={[{ required: true, message: 'Please input the title of collection!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="region"
                label="区域"
                rules={isDisable?"":[{ required: true, message: 'Please input the title of collection!' }]}
            >
                <Select disabled={isDisable}>
                    {
                        regionList.map(item => {
                            return <Option key={item.id} value={item.value}>{item.title}</Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item
                name="roleId"
                label="角色"
                rules={[{ required: true, message: 'Please input the title of collection!' }]}
            >
                <Select onChange={(value)=>{
                    //  console.log(value);/* 打印的是角色列表的 value */
                    if(value===1){
                    setisDisabled(true)
                    ref.current.setFieldsValue({region:""})/*setFieldsValue:设置表单的值,region是区域的表单中的name字段:region*/
                    }else{
                     setisDisabled(false)
                    }
                }}> 
                    {
                        roleList.map(item => {
                            return <Option key={item.id} value={item.roleType}>{item.roleName}</Option>
                        })
                    }
                </Select>
            </Form.Item>
        </Form>
    )
 })
export default UserForm