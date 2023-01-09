import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Tag, Button,notification } from 'antd'
export default function AuditList(props) {
    const [dataSource, setdataSource] = useState([])
    const { username } = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {/* _ne：代表不等于;_lte:小于等于;_gte:大于 */
        axios(`/news?author=${username}&auditState_ne=0&publishState_lte=1`).then(res => {
            console.log(res.data)
            setdataSource(res.data)
        })
    }, [username])
    const columns = [
        {
            title: '新闻标题',
            dataIndex: 'title',
            render(title,item){
              return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
            }
        },
        {
            title: '作者',
            dataIndex: 'author'
        },
        {
            title: '新闻分类',
            dataIndex: 'categoryId',
            render(categoryId) {
                switch (categoryId) {
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
            title: '审核状态',
            dataIndex: 'auditState',
            render(auditState) {
                const colorList = ["", 'orange', 'green', 'red']
                const auditList = ["草稿箱", "审核中", "已通过", "未通过"]
                return <Tag color={colorList[auditState]}>{auditList[auditState]}</Tag>
            }
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    {
                        item.auditState === 1 && <Button onClick={()=>{handleRervert(item)} }>撤销</Button>
                    }
                    {
                        item.auditState === 2 && <Button danger onClick={()=>{handlePublish(item)}}>发布</Button>
                    }
                    {
                        item.auditState === 3 && <Button type="primary" onClick={()=>{handleUpdate(item)}}>更新</Button>
                    }
                </div>
            }
        }

    ]
    /* 撤销 */
   const  handleRervert=(item)=>{
      setdataSource(dataSource.filter(data=>data.id!==item.id))
      axios.patch(`/news/${item.id}`,{
        auditState:0
      })
      .then(res=>{
        notification.info({
            message: `通知`,
            description:
              `您可以到草稿箱中查看您的新闻`,
            placement:"bottomRight"
        });
      })
   }
   /* 更新 */
   const handleUpdate = (item)=>{
    props.history.push(`/news-manage/update/${item.id}`)
}
   /* 发布 */
   const handlePublish=(item)=>{
      axios.patch(`/news/${item.id}`,{
        "publishState":2,
        "publishTime": Date.now()
      }).then(res=>{
        props.history.push('/publish-manage/published')
        notification.info({
            message: `通知`,
            description:
              `您可以到【发布管理/已经发布】中查看您的新闻`,
            placement:"bottomRight"
        });
      })
   }
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} pagination={{pageSize:5}} rowKey={item=>item.id} />
        </div>
    )
}
