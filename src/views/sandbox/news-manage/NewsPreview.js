import React, { useEffect, useState, } from 'react'
import { Descriptions, PageHeader } from 'antd';
import axios from 'axios';
import moment from 'moment'
export default function NewsPreview(props) {
    const [newsInfo, setnewsInfo] = useState([])
    useEffect(() => {

        axios.get(`/news/${props.match.params.id}`).then(res => {
            setnewsInfo(res.data)
            console.log(res.data);
        })
    }, [props.match.params.id])
    const auditList = ["未审核", '审核中', '已通过', '未通过']
    const publishList = ["未发布", '待发布', '已上线', '已下线']
    return (
        <div>
            <PageHeader
                onBack={() => window.history.back()}
                title={newsInfo.title}
                subTitle="This is a subtitle"
            ></PageHeader>
            <Descriptions size="small" column={3}>
                <Descriptions.Item label="创建者">{newsInfo.author}</Descriptions.Item>
                <Descriptions.Item label="创建时间">{moment(newsInfo.createTime).format("YYYY/MM/DD HH:mm:ss")}</Descriptions.Item>
                <Descriptions.Item label="发布时间">{newsInfo.publishTime ? moment(newsInfo.publishTime).format("YYYY/MM/DD HH:mm:ss") : "-"}</Descriptions.Item>
                <Descriptions.Item label="区域">{newsInfo.region}</Descriptions.Item>
                <Descriptions.Item label="审核状态"><span style={{ color: "red" }}>{auditList[newsInfo.auditState]}</span></Descriptions.Item>
                <Descriptions.Item label="发布状态" ><span style={{ color: "red" }}>{publishList[newsInfo.publishState]}</span></Descriptions.Item>
                <Descriptions.Item label="访问数量">{newsInfo.view}</Descriptions.Item>
                <Descriptions.Item label="点赞数量">{newsInfo.star}</Descriptions.Item>
                <Descriptions.Item label="评论数量">0</Descriptions.Item>
            </Descriptions>
            <div dangerouslySetInnerHTML={{
                        __html:newsInfo.content
                    }} style={{
                        margin:"0 24px",
                        border:"1px solid gray"
                    }}>
                    </div>
        </div>
    )
}
