import axios from 'axios'
import {notification} from 'antd'
import {useState,useEffect} from 'react'
function usePublish(type) {
    const [datasourse, setdatasourse] = useState([])
    const {username} = JSON.parse(localStorage.getItem("token"))
    useEffect(() => {
        axios(`/news?author=${username}&publishState=${type}&_expand=category`).then(res=>{
            // console.log(res.data)
            setdatasourse(res.data)
        })
    }, [username,type])
    /* 发布按钮 */
    const handlePublish=(id)=>{
      setdatasourse(datasourse.filter(data=>data.id!==id))
       axios.patch(`/news/${id}`,{
        "publishState":2,
        "publishTime":Date.now()
       }).then(res=>{
        notification.info({
            message: `通知`,
            description:
              `您可以到【发布管理/已经发布】中查看您的新闻`,
              placement:"topRight"
        });
       })
    }
    /* 下线按钮 */
    const handleSunset = (id)=>{
        setdatasourse(datasourse.filter(item=>item.id!==id))

        axios.patch(`/news/${id}`, {
            "publishState": 3,
        }).then(res=>{
            notification.info({
                message: `通知`,
                description:
                  `您可以到【发布管理/已下线】中查看您的新闻`,
                placement:"bottomRight"
            });
        })
    }
    /* 删除去按钮 */
    const handleDelete = (id)=>{
        setdatasourse(datasourse.filter(item=>item.id!==id))

        axios.delete(`/news/${id}`).then(res=>{
            notification.info({
                message: `通知`,
                description:
                  `您已经删除了已下线的新闻`,
                placement:"bottomRight"
            });
        })

    }
  return {
    datasourse,
    handlePublish,
    handleSunset,
    handleDelete
  }
}
export default usePublish