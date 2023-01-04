import { Table, Button, Modal, Alert, message, Tree, } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DeleteOutlined, ExclamationCircleOutlined, UnorderedListOutlined } from '@ant-design/icons'
const { confirm } = Modal
export default function RightList() {
    const [dataSource, setdataSource] = useState([])/* 角色列表信息 */
    const [rightList, setrightList] = useState([])/* 权限列表信息 */
    const [currentList, setcurrentList] = useState([])/* 我点击当前这一项的信息 */
    const [currentId, setcurrentId] = useState(0)/* 我选中那一行的id */
    const [setisModalVisible, setsetisModalVisible] = useState(false)/* model开关 */
    useEffect(() => {
        axios.get('/roles')
            .then(res => {
                console.log(res.data);
                let list = res.data
                setdataSource(list)
            })
    }, [])
    useEffect(() => {
     axios.get('/rights?_embed=children')
     .then(res=>{
        setrightList(res.data)
     })
    }, [])
    



    const columns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: '角色名称',
            dataIndex: 'roleName'
        },
        {
            title: '操作',
            render(item) {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined />} style={{ marginRight: 10 }} onClick={() => { handleClear(item) }} />

                    <Button type="primary" shape="circle" icon={<UnorderedListOutlined />} onClick={() => {
                        setsetisModalVisible(true)/* 开关 */
                        setcurrentList(item.rights)/* 拿到权限列表 */
                        setcurrentId(item.id)
                    }
                    } />
                </div>
            }
        }
    ];
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
        axios.delete(`/roles/${item.id}`)
    }
    /* ............................................ */

    // 确定按钮
    const handleOk=() => {
        setsetisModalVisible(false)
        let data=[]
        data=dataSource.map(item=>{
            if(item.id===currentId){
                return{
                    ...item,
                    rights:currentList
                }
            }
            return item
        })
        setdataSource(data)
        axios.patch(`/roles/${currentId}`,{
            rights:currentList
        })
        message.success('修改成功')
    }
    //树形控件
    const onCheck=(checkKeys)=>{
        setcurrentList(checkKeys)
       /* console.log(checkKeys); 打印的是role中的rights列表 */
    }

    return (
        <div>
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
            <Modal
                title="权限分配"
                open={setisModalVisible}
                onOk={handleOk}
                onCancel={() => { setsetisModalVisible(false) }}
            >
                
                <Tree
                checkable/* 节点前加复选框 */
                checkStrictly={true}/* checkable 状态下节点选择完全受控（父子节点选中状态不再关联) */
                treeData={rightList}/* 内容 */
                checkedKeys={currentList}/*默认选中, 将default 去掉改成受控,currentList是role中的rights */
                onCheck={onCheck}
                />
            </Modal>
           
        </div>
    )
}
