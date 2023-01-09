
import React from 'react'
 import NewsPublish from '../../../components/publish-message/NewsPublish'
 import usePublish from '../../../components/publish-message/UsePublish'
 import {Button} from 'antd'
export default function Unpublished() {
    let {datasourse,handlePublish}=usePublish(1)
    console.log(datasourse);
    return (
        <div>
           <NewsPublish dataSource={datasourse} 
           button={(id)=><Button type="primary" onClick={()=>{handlePublish(id)}}>发布</Button>}
           ></NewsPublish>
        </div>
    )
}
