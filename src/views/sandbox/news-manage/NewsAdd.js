import React, { useState } from 'react'
import { Button, PageHeader, Steps } from 'antd'
import style from'./News.module.css'
export default function NewsAdd() {
    const [current, setcurrent] = useState(0)
    const handleNext=()=>{
        setcurrent(current+1)
    }
    const handlePrevious =()=>{
        setcurrent(current-1)
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
            <div className={current===0?'':style.active}>
                <input type="text"/>
            </div>

            <div className={current===1?'':style.active}>22222</div>
            <div className={current===2?'':style.active}>3333</div>





          <div style={{marginTop:'50px'}}>
             {
                current===2&&
                <div>
                <Button>保存草稿</Button>
                <Button>提交审核</Button>
                </div>
             }
             {current<2&&<Button type='primary' onClick={handleNext}>下一步</Button>}
             {current>0&&<Button onClick={handlePrevious}>上一步</Button>}
          </div>
        </div>
    )
}
