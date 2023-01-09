import React, { useState, useEffect } from 'react'
import { Button, Table, Modal,notification} from 'antd'
import axios from 'axios'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined,UploadOutlined } from '@ant-design/icons'
const { confirm } = Modal
export default function NewsDraft(props) {
    const [dataSource, setdataSource] = useState([])

    const {username}  = JSON.parse(localStorage.getItem("token"))
    useEffect(() => {
        axios.get(`/news?author=${username}&auditState=0`).then(res=> {
            const list = res.data
             console.log(list);
             setdataSource(list)
        })
    }, [username])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '新闻标题',
            dataIndex: 'title',
            render:(title,item)=>{
                return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
            }
        },
        {
            title: '作者',
            dataIndex: 'author'
        },
        {
            title:'新闻分类',
            dataIndex:'categoryId',
            render(categoryId){
              switch(categoryId){
                case 1:
                    return <div>时事新闻</div>
                case 2:
                    return <div>环球经济</div>    
                case 3:
                    return <div>科学技术</div>    
                case 4:
                    return <div>军事世界</div>    
                case 5:
                    return <div>世界体育</div>   
                case 6:
                    return <div>生活理财</div>    
                 default:
                    return ''   
              }
            }
        },
        {
            title: "操作",
            render: (item) => {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)} />
                    <Button shape="circle" icon={<EditOutlined />}  onClick={()=>{
                      props.history.push(`/news-manage/update/${item.id}`)
                    }}/>

                    <Button type="primary" shape="circle" icon={<UploadOutlined />} onClick={()=>handleCheck(item)}/>
                </div>
            }
        }
    ];
    const confirmMethod = (item) => {
        console.log(item);
        confirm({
            title: '你确定要删除?',
            icon: <ExclamationCircleOutlined />,
            // content: 'Some descriptions',
            onOk() {
                deleteMethod(item)
            },
            onCancel() {
            },
        });

    }
    //删除
    const deleteMethod = (item) => {
        // console.log(item)
        // 当前页面同步状态 + 后端同步
        setdataSource(dataSource.filter(data => data.id !== item.id))
        axios.delete(`/news/${item.id}`)
    }
    /* 新闻提交 */
    const handleCheck=(item)=>{
        axios.patch(`/news/${item.id}`,{
            auditState:1,
            publishState:1
        }).then(res=>{
            console.log(res.data);
            props.history.push('/audit-manage/list')
            notification.info({
                message: `通知`,
                description:
                  `您可以到${'审核列表'}中查看您的新闻`,
                placement:"bottomRight"
            });
        })
    }
    return (
        <div>
            <Table dataSource={dataSource} columns={columns}
                pagination={{
                    pageSize: 5
                }} 
                rowKey={item=>item.id}
                />
        </div>
    )
}
