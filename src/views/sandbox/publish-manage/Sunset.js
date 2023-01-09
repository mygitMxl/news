
import React from 'react'
import NewsPublish from '../../../components/publish-message/NewsPublish'
import usePublish from '../../../components/publish-message/UsePublish'
import {Button} from 'antd'
export default function Unpublished() {
   let {datasourse,handleDelete}=usePublish(3)
   console.log(datasourse);
   return (
       <div>
          <NewsPublish dataSource={datasourse} 
          button={(id)=><Button type="primary" onClick={()=>{handleDelete(id)}}>删除</Button>}
          ></NewsPublish>
       </div>
   )
}
