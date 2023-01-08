import React, { useEffect, useState, } from 'react'
import { Descriptions,PageHeader } from 'antd';
import axios from 'axios';
export default function NewsPreview(props) {
    const [newsInfo, setnewsInfo] = useState([])
    useEffect(() => {
       
        axios.get(`/news/${props.match.params.id}`).then(res=>{
            setnewsInfo(res.data)
            console.log(res.data);
        })
    }, [props.match.params.id])
    return (
        <div>
             <PageHeader
                onBack={() => window.history.back()}
                title="Title"
                subTitle="This is a subtitle"
            ></PageHeader>
             <Descriptions size="small" column={3}>
                <Descriptions.Item label="">Zhou Maomao</Descriptions.Item>
                <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                <Descriptions.Item label="Remark">empty</Descriptions.Item>
                <Descriptions.Item label="Address">
                    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}
