import { Table, Button,Tag, Modal, Popover,Switch } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined,ExclamationCircleOutlined } from '@ant-design/icons'
const { confirm } = Modal
export default function RightList() {
    const [dataSource, setdataSource] = useState([])
    useEffect(() => {
        axios.get('/rights?_embed=children')
        .then(res => {
            console.log(res.data);
            let list=res.data
            list.forEach(item=>{/* 解决首页没有孩子,出现树形控件的问题 */
                if(item.children.length===0){
                   item.children=''
                }
                setdataSource(list)
            })
        })
    }, [])


 
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: '权限名称',
            dataIndex: 'title'
        },
        {
            title: "权限路径",
            dataIndex: 'key',
            render(key){
            return  <Tag color="#f50">{key}</Tag>
            }
        },
        {
            title: '操作',
            render(item) {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined />} style={{marginRight:10}} onClick={()=>{handleClear(item)}}/>
                    <Popover
                     content={
                        <div style={{textAlign:'center'}}><Switch checked={item.pagepermisson} onChange={()=>{switchMethod(item)}}/></div>
                     }
                     title="页面配置项"
                     trigger={item.pagepermisson===undefined?'':'click'}
                    >
                    <Button type="primary" shape="circle" icon={<EditOutlined />}  disabled={item.pagepermisson===undefined}/>
                    </Popover>
                </div>
            }
        }
    ];
    /* 删除权限 */
    const handleClear=(item)=>{
        console.log(item);/* 我点击哪一行显示哪一行数据 */
      confirm({
        title:'您确定要删除吗',
        icon: <ExclamationCircleOutlined />,
        onOk(){
            deleMethod(item)
        }
      })
    }   
  const deleMethod=(item)=>{
    if (item.grade === 1) {
        setdataSource(dataSource.filter(data => data.id !== item.id))
        axios.delete(`/rights/${item.id}`)
    }else{
        let list=dataSource.filter(data=>data.id===item.rightId)/* 通过rightid匹配相应的父级,先检索出来 */
         list[0].children=list[0].children.filter(data=>data.id!==item.id)
         console.log(list);
         console.log(dataSource);
         setdataSource([...dataSource])/* 当修改list的时候 dataSource也发生改变了,既要得到没修改的数据,也要的到修改了的数据,直接解构...dataSourse */
         axios.delete(`/children/${item.id}`)
    }
}
  /* ............................................ */
   //更新全选
   const switchMethod=(item)=>{
    item.pagepermisson = item.pagepermisson===1?0:1/* 这样就可以控制Switch了 */
    setdataSource([...dataSource])/* item.pagepermisson修改了,dataSource也发生改变了 */
    if(item.grade===1){
        axios.patch(`/rights/${item.id}`,{
            pagepermisson:item.pagepermisson
        })
    }else{
        axios.patch(`/children/${item.id}`,{
            pagepermisson:item.pagepermisson
        })
    }
   }
    return (
        <div>
            <Table dataSource={dataSource} columns={columns}  pagination={{pageSize:5}} />
        </div>
    )
}
