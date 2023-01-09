import React, { useState, useEffect, useRef, } from 'react'
import { PageHeader, Steps, Input, Select, Button, message,notification } from 'antd'
import axios from 'axios';
import style from './News.module.css'
import Form from 'antd/es/form/Form';
import NewsEditor from '../../../components/news-message/NewsEditor';
const { Step } = Steps;
const { Option } = Select;
export default function NewsUpdate(props) {
    const [current, setcurrent] = useState(0)/* 步骤条当前位置 */
    const [categoryList, setcategoryList] = useState([])/* 新闻类型 */
    const [content, setContent] = useState('')/* 富文本信息 */
    const [formInfo, setformInfo] = useState({})
    const NewsForm = useRef()
    useEffect(() => {
        axios.get(`/news/${props.match.params.id}?_expand=role&`).then(res => {
            console.log(res.data);
            let { title, categoryId, content } = res.data
            NewsForm.current.setFieldsValue({
                title,
                categoryId
            })
            setContent(content)/* 传的是html,参数传给富文本时需要,转为drafts */
        })
    }, [props.match.params.id])

    useEffect(() => {
        axios.get('/categories').then(res => {
            setcategoryList(res.data)
        })
    }, [])

    /* 表单栅格布局 */
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    }
    /* 下一步 */
    const handleNext = () => {
        if (current === 0) {
            let data = NewsForm.current.getFieldValue()
            setformInfo(data)
            setcurrent(current + 1)
        } else {
            if (content === "" || content.trim() === "<p></p>") {
                message.error("新闻内容不能为空")
            } else {
                setcurrent(current + 1)
            }
        }

    }
    /* 上一步 */
    const handlePrevious = () => {
        setcurrent(current - 1)
    }
    /* 提交或草稿箱 */
    const handleSave=(auditState)=>{
    axios.patch(`/news/${props.match.params.id}`,{
        ...formInfo,
        content:content,
        auditState:auditState
    })
    .then(res=>{
        props.history.push(auditState===0?'/news-manage/draft':'/audit-manage/list')
        notification.info({
            message: `通知`,
            description:
              `您可以到${auditState===0?'草稿箱':'审核列表'}中查看您的新闻`,
            placement:"bottomRight"
        });
    })
    }
    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="更新新闻"
                onBack={() => props.history.goBack()}
                subTitle="This is a subtitle"
            />
            <Steps current={current}>
                <Step title="基本信息" description="新闻标题，新闻分类" />
                <Step title="新闻内容" description="新闻主体内容" />
                <Step title="新闻提交" description="保存草稿或者提交审核" />
            </Steps>
            <div style={{ marginTop: '50px' }}>
                <div className={current === 0 ? '' : style.active}>
                    <Form {...layout} name="basic" ref={NewsForm}>
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
                                    categoryList.map(item =>
                                        <Option value={item.id} key={item.id}>{item.title}</Option>
                                    )
                                }
                            </Select>
                        </Form.Item>
                    </Form>
                </div>

                <div className={current === 1 ? '' : style.active}>
                    <NewsEditor getContent={(value) => {
                        setContent(value)
                    }} content={content} />
                </div>

                <div className={current === 2 ? '' : style.active}>

                </div>
            </div>


            {
                current < 2 && <Button type="primary" onClick={handleNext}>下一步</Button>
            }
            {
                current > 0 && <Button onClick={handlePrevious}>上一步</Button>
            }
            {
                current === 2 && [
                    <Button type="primary" onClick={()=>{handleSave(0)}}>保存草稿箱</Button>,
                    <Button danger onClick={()=>{handleSave(1)}}>提交审核</Button>
                ]
            }
        </div>
    )
}
