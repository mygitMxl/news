import { Table, Button, Modal, message, Switch, Form, Input, Select } from 'antd'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import UserForm from '../../../components/userMseeage/user-Form'
import { DeleteOutlined, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons'
const { confirm } = Modal

export default function RightList() {
    const [dataSource, setdataSource] = useState([])/* 角色列表信息 */
    const [setisModalVisible,setsetisModalVisible] = useState(false)/* 添加用户model开关 */
    const [isUpdateVisible, setisUpdateVisible] = useState(false)
    const [regionList, setregion] = useState([])/* 区域信息 */
    const [roleList, setroleList] = useState([])/* 角色列表 */
    const [isUpdateDisabled, setisUpdateDisabled] = useState(false)
    const [currentId, setcurrentId] = useState(null)
    const user=useRef()
    const update=useRef()

    const {roleId,region,username}=JSON.parse(localStorage.getItem("token"))

    useEffect(() => {
        const roleObj = {
            "1":"superadmin",
            "2":"admin",
            "3":"editor"
        }
        axios.get("/users?_expand=role").then(res => {
            const list = res.data
            console.log(list);
            setdataSource( roleObj[roleId]==="superadmin"?list:[/* 也就是说roleId=1的时候 拿到所有list*/
            ...list.filter(item=>item.username===username),//token中自己的名字
            ...list.filter(item=>item.region===region&& roleObj[item.roleId]==="editor")//和同一地区的区域编辑的角色
        ])
        })
    }, [roleId,region,username])
    useEffect(() => {
      axios.get('/regions')
      .then(res=>{
        setregion(res.data)
      })
    }, [])
     useEffect(() => {
       axios.get('/roles')
       .then(res=>{
        setroleList(res.data)
       })
     }, [])
    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            filters:[
                ...regionList.map(item=>({
                    text:item.title,/* 所有地域数据 */
                    value:item.value
                })),
                {/* region没有全球,添上 */
                    text:'全球',
                    value:'全球'
                }
            ],
            onFilter:(value,item)=>{
                if(value==='全球'){
                    return item.region===''
                }
                return item.region===value
            },

            render(region) {
                return <b>{region === "" ? '全球' : region}</b>
            }
        },
        {
            title: '角色名称',
            dataIndex: 'role',
            render(role) {
                return role?.roleName
            }
        },
        {
            title: '用户名',
            dataIndex: 'username'
        },
        {
            title: '用户状态',
            dataIndex: 'roleState',
            render(roleState, item) {
                return <Switch checked={roleState} disabled={item.default} onChange={()=>{handleChange(item)}} />
            }
        },
        {
            title: '操作',
            render(item) {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined />} disabled={item.default} style={{ marginRight: 10 }} onClick={() => { handleClear(item) }} />

                    <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.default} onClick={() => {
                       updates(item)
                       setcurrentId(item.id)
                    }
                    } />
                </div>
            }
        }
    ];
    /* 用户状态 */
    const handleChange=(item)=>{
      item.roleState=!item.roleState
      setdataSource([...dataSource])
      axios.patch(`/users/${item.id}`,{
        roleState: item.roleState
      })
    }
    /* 删除权限 */
    const handleClear = (item) => {
        console.log(item);/* 我点击哪一行显示哪一行数据 */
        confirm({
            title: '您确定要删除吗',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                deleMethod(item)
            }
        })
    }
    const deleMethod = (item) => {
        setdataSource(dataSource.filter(data => data.id !== item.id))
        axios.delete(`/users/${item.id}`)
    }
    // /* ............................................ */

    // 添加用户 确定按钮
    const handleOk = () => {
       let data=user.current.getFieldsValue()/* 获取表单 */
       if(data.username===undefined||data.password===undefined||data.region===undefined||data.roleId===undefined){
        message.info('表单不可为空')
       }else{
        setsetisModalVisible(false)
        user.current.resetFields()/* 清空表单 */
        axios.post('/users',{
            ...data,
            "roleState":true,
            "default": false,
        }).then(res=>{
            console.log(res.data);
            setdataSource([...dataSource,{
              ...res.data,
              role:roleList.filter(item=>item.id===data.roleId)[0]/*之所以这里要加role,是因为表格中角色名称,通过role字段来匹配,而role是连表才出现的,user本身是没有的,所以这里要填上,否则,添加用户后角色名称不显示,只能刷新后显示,通过id匹配字段,下表0是只匹配一个 */
            }])
        })
       }
    }
    /* .................................... ................ */
    //筛选用户按钮
    const updates= async(item)=>{
        await setisUpdateVisible(true)/* react状态更新并不保证是同步的,setstate本神是异步的,所以模态框都没有创建出来,更拿不到表单中的值，所以需要模态框同步执行,可以将setstate放在settimeout里面这时,setstate就是同步了,然后就会线执行模态框,在执行表单传值。或者async await 也能实现*/
        if(item.roleId===1){/* roleId是超级管理员,在更修用户的模态框中,超级管理员的地域,依然是,disabled:true,这时就可以在父组件创建disabled的状态,给儿子传过去,更新儿子中的disabled */
            setisUpdateDisabled(true)
        }else{
            setisUpdateDisabled(false)
        }
        update.current.setFieldsValue(item)/* 通过setFieldsValue给表单设置值 */
    }

     //筛选用户提交按钮
     const handleUpdate=()=>{
        
        let data=update.current.getFieldsValue()/* 获取表单 */
        if(data.username===undefined||data.password===undefined||data.region===undefined||data.roleId===undefined){
         message.info('表单不可为空')
        }else{
        setisUpdateVisible(false)
         update.current.resetFields()/* 清空表单 */
         let value=dataSource.map(item=>{
          if(item.id===currentId){
            return{
                ...item,
                ...data,
                role:roleList.filter(datas=>datas.id===data.roleId)[0]
            }
          }
          return item
         })
         setdataSource(value)
         setisUpdateDisabled(!isUpdateDisabled)/* 初始化disable */
         axios.patch(`/users/${currentId}`,data)
     }
    }
    return (
        <div>
            <Button type="primary" onClick={() => { setsetisModalVisible(true) }} >添加用户</Button>
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
            <Modal
                title="权限分配"
                okText="确定"
                cancelText="取消"
                open={setisModalVisible}
                onOk={handleOk}
                onCancel={() => { setsetisModalVisible(false);user.current.resetFields()}}
            >
                <UserForm regionList={regionList} roleList={roleList} ref={user} />
            </Modal>

            <Modal
                title="筛选用户"
                open={isUpdateVisible}
                okText="更新"
                cancelText="取消"
                onOk={handleUpdate}
                onCancel={() => {setisUpdateVisible(false);update.current.resetFields();setisUpdateDisabled(!isUpdateDisabled)}}/*!isUpdateDisabled:取消后让选择了超级管理员的地域变回最初始的样子 */
            >
                <UserForm regionList={regionList} roleList={roleList} ref={update} isUpdateDisabled={isUpdateDisabled} isUpdate={true} />
                </Modal>
        </div>
    )
}
