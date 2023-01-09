import {Table } from 'antd'
import React from 'react'
export default function NewsPublish(props) {
    const columns=[
        {
            title:'新闻标题',
            dataIndex:'title',
            render: (title,item) => {
                return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
            }
        },
        {
            title:'作者',
            dataIndex:'author'
        },
        {
            title:'新闻分类',
            dataIndex:'category',
            render:(category)=>{
            return <div>{category.title}</div>
            }
        },
        {
            title:'操作',
            render(item){
                return<div>
                    {props.button(item.id)}{/* 给父亲传id,父亲在传给自定义hooks,这时自定义hooks实现操作功能时,对应的id就会响应按钮的操作 */}
                </div>
            }
        }
    ]
  return (
    <div>
        <Table dataSource={props.dataSource} columns={columns}
                pagination={{
                    pageSize: 5
                }} 
                rowKey={item=>item.id}
                />
    </div>
  )
}
