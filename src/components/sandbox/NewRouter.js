import React,{useState,useEffect} from 'react'
import Home from '../../views/sandbox/home/home'
import  Nopermission from '../../views/sandbox/nopermission/Nopermission'
import RightList from '../../views/sandbox/right-manage/RightList'
import RoleList from '../../views/sandbox/right-manage/RoleList'
import UserList from '../../views/sandbox/user-manage/userList'
import { Switch, Route, Redirect } from 'react-router-dom'
import NewsAdd from '../../views/sandbox/news-manage/NewsAdd'
import NewsDraft from '../../views/sandbox/news-manage/NewsDraft'
import NewsCategory from '../../views/sandbox/news-manage/NewsCategory'
import Audit from '../../views/sandbox/audit-manage/Audit'
import AuditList from '../../views/sandbox/audit-manage/AuditList'
import Unpublished from '../../views/sandbox/publish-manage/Unpublished'
import Published from '../../views/sandbox/publish-manage/Published'
import Sunset from '../../views/sandbox/publish-manage/Sunset'
import NewsPreview from '../../views/sandbox/news-manage/NewsPreview'
import NewsUpdate from '../../views/sandbox/news-manage/NewsUpdate'
import axios from 'axios'
import { connect } from 'react-redux'
import { Spin } from 'antd'
function NewRouter(props) {
    const [backRouteList, setbackRouteList] = useState([])//后端返回的路由列表
    const LocalRouterMap = {
        "/home": Home,
        "/user-manage/list": UserList,//用户列表
        "/right-manage/role/list": RoleList,//角色列表
        "/right-manage/right/list": RightList,//权限列表
        "/news-manage/add": NewsAdd,//撰写新闻
        "/news-manage/draft": NewsDraft,//草稿箱
        "/news-manage/category": NewsCategory,//新闻分类
        "/news-manage/preview/:id":NewsPreview,/* 草稿列表详情路径 */
        "/news-manage/update/:id":NewsUpdate,/* 新闻更新详情页 */
        "/audit-manage/audit": Audit,//审核新闻
        "/audit-manage/list": AuditList,//审核列表
        "/publish-manage/unpublished": Unpublished,//待发布
        "/publish-manage/published": Published,//已发布
        "/publish-manage/sunset": Sunset//已下线
    }
    useEffect(() => {
     axios.all([
        axios.get('/rights'),
        axios.get('/children')
     ]).then(res=>{
        // console.log(res[0].data,res[1].data);
        setbackRouteList([...res[0].data,...res[1].data])//合并数据
     })
    }, [])

    const {role:{rights}}=JSON.parse(localStorage.getItem('token'))
    
    const  checkout =(item)=>{ 
    return   LocalRouterMap[item.key]&&(item.pagepermisson||item.routepermisson)  //首先LocalRouterMap里有item里的路径,并且有pagepermisson这个字段 ,场景:超级管理员管理权限时,比如将首页开关关掉,在地址栏输入/home 依然可以跳过去。*/
    }                                                       /* item.routepermisson是新闻浏览的专属字段,不加无法浏览 */
    const checkUserPermission=(item)=>{
      return rights.includes(item.key)//登录的角色的权限包含这个item的key就创建出来,场景:区域编辑在地址栏输入/user-manage/list,就可以去管理用户了,但是这并不时他的权限,所以...
    }
    return (
        <div>
            <Spin size="large" spinning={props.isLoading}>
            <Switch>
                {
                 backRouteList.map(item=>{
                    // console.log(backRouteList);
                    if(checkout(item)&&checkUserPermission(item)){

                    return <Route path={`${item.key}`} component={LocalRouterMap[item.key]} exact key={item.key}/>
                }
                    return null
                 })
                }
               <Redirect from='/' to={'/home'} exact/>
              {backRouteList.length>0&&<Route component={Nopermission}/>}{/* 数据还没回来时,就会到404.所以需要优化一下 */}

            </Switch>
            </Spin>
        </div>
    )
}

const mapStateToProps = (state)=>{
   return{
    isLoading:state.loading.isLoading
   }
  }

export default connect(mapStateToProps)(NewRouter)