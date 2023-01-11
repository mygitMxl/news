import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Descriptions, PageHeader } from 'antd'
import { HeartTwoTone } from '@ant-design/icons'
import moment from 'moment'
export default function Detail(props) {
  const [Info, setInfo] = useState(null)
  useEffect(() => {
    axios.get(`/news/${props.match.params.id}?_expand=category&_expand=role`)
      .then(res => {
        setInfo({ ...res.data, view: res.data.view + 1 })
        return res.data
      }).then(res => {/* 这相当于补丁请求 */
        axios.patch(`/news/${props.match.params.id}`, {
          view: res.view + 1
        })
      })
  }, [props.match.params.id])

  /* 点赞 */
  const handleStar = () => {
    setInfo({ ...Info,star:Info.star + 1 })
    axios.patch(`news/${props.match.params.id}`, {
      star: Info.star + 1
    })
  }
  return (
    <div>
      {
        Info && <div>
          <PageHeader
            onBack={() => window.history.back()}
            title={Info.title}
            subTitle={
              <div>{Info.category.title}
                <HeartTwoTone twoToneColor="#eb2f96" onClick={() => handleStar()} />
              </div>}
          >
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="创建者">{Info.author}</Descriptions.Item>

              <Descriptions.Item label="发布时间">{
                Info.publishTime ? moment(Info.publishTime).format("YYYY/MM/DD HH:mm:ss") : "-"
              }</Descriptions.Item>
              <Descriptions.Item label="区域">{Info.region}</Descriptions.Item>

              <Descriptions.Item label="访问数量">{Info.view}</Descriptions.Item>
              <Descriptions.Item label="点赞数量">{Info.star}</Descriptions.Item>
              <Descriptions.Item label="评论数量">0</Descriptions.Item>
            </Descriptions>
          </PageHeader>

          <div dangerouslySetInnerHTML={{
                        __html:Info.content
                    }} style={{
                        margin:"0 24px",
                        border:"1px solid gray"
                    }}>
                    </div>
        </div>
      }
    </div>
  )
}
