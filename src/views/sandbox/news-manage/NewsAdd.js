import React, { useRef, useState, useEffect } from 'react'
import { Button, Form, PageHeader, Steps, Input, Select, message, notification } from 'antd'
import style from './News.module.css'
import axios from 'axios'
import NewsEditor from '../../../components/news-message/NewsEditor'
const { Option } = Select;
export default function NewsAdd(props) {
    const [current, setcurrent] = useState(0)
    const [categories, setcategories] = useState([])/* 新闻类型 */
    const [content, setcontext] = useState('')/* 富文本编辑器内容 */
    const [formInfo, setformInfo] = useState([])/* 表单内容 */
    const NewsForm = useRef()
    useEffect(() => {
        axios.get('/categories ')
            .then(res => {
                setcategories(res.data)
            })
    }, [])

    //前进
    const handleNext = () => {
        if (current === 0) {
            let data = NewsForm.current.validateFields()
            setcurrent(current + 1)
            setformInfo(data)
        } else {
            if (content === '' || content.trim() === '<p></p>') {/* 富文本编辑器,一点击就会出现一个<p></p>,所以不能让他当文本,trim()除去空格 */
                message.error("新闻内容不能为空")
            } else {
                setcurrent(current + 1)
            }
        }
    }
    //后退
    const handlePrevious = () => {
        setcurrent(current - 1)
    }
    //表单栅格布局
    const layout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 19 },
    }
    //提交&&存草稿
    const User = JSON.parse(localStorage.getItem('token'))
    const handleSave = (auditState) => {//形参为0 时走草稿箱,为1走提交
        axios.post('/news', {
            ...formInfo,
            "content": content,
            "region": User.region ? User.region : "全球",
            "author": User.username,
            "roleId": User.roleId,
            "auditState": auditState,/*  */
            "publishState": 0,
            "createTime": Date.now(),
            "star": 0,
            "view": 0,
        }).then(res => {
            props.history.push(auditState === 0 ? '/news-manage/draft' : '/audit-manage/list')
            notification.info({
                message: '通知',
                description: `您可以在${auditState === 0 ? '草稿箱' : '审核列表'}查看您的新闻`,
                placement: "bottomRight",
            })
        })
    }
    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="撰写新闻"
                subTitle="This is a subtitle"
            />
            <Steps current={current}
                items={[
                    {
                        title: '基本信息',
                        description: '新闻标题，新闻分类',
                    },
                    {
                        title: '新闻内容',
                        description: '新闻主体内容',
                    },
                    {
                        title: '新闻提交',
                        description: '保存草稿或者提交审核',
                    },
                ]}
            />
            <div className={current === 0 ? '' : style.active}>
                <Form {...layout} name="basic" ref={NewsForm} style={{ marginTop: '58px' }}>
                    <Form.Item
                        label="新闻标题"
                        name="title"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="新闻分类"
                        name="categoryId"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Select>
                            {
                                categories.map(item =>
                                    <Option value={item.id} key={item.id}>{item.title}</Option>
                                )
                            }
                        </Select>
                    </Form.Item>
                </Form>
            </div>

            <div className={current === 1 ? '' : style.active}>
                <NewsEditor getContent={(value) => { setcontext(value); console.log(value); }} />
            </div>
            <div className={current === 2 ? '' : style.active}>3333</div>
            <div style={{ marginTop: '50px' }}>
                {
                    current === 2 &&
                    <div>
                        <Button type='primary' onClick={() => { handleSave(0) }}>保存草稿</Button>
                        <Button danger onClick={() => { handleSave(1) }}>提交审核</Button>
                    </div>
                }
                {current < 2 && <Button type='primary' onClick={handleNext}>下一步</Button>}
                {current > 0 && <Button onClick={handlePrevious}>上一步</Button>}
            </div>
        </div>
    )
}
