import { Card, Col, Row, List,Avatar } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import React,{useEffect,useRef,useState} from 'react'
import axios from 'axios';
import * as echarts from 'echarts';
import _ from 'lodash'
const { Meta } = Card;
export default function Home() {
  const [viewList, setviewList] = useState([])
  const [starList, setstarList] = useState([])
  const barRef = useRef()
  const{username,region,role:{roleName}}=JSON.parse(localStorage.getItem('token'))
  useEffect(()=>{/* _sort:正序,_order=desc反序,_limit限制条数*/
    axios.get("/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6").then(res=>{
        setviewList(res.data)
    })
},[])
useEffect(() => {
  axios.get('/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6')
  .then(res=>{
    console.log(res.data);
    setstarList(res.data)
  })
}, [])

/* ................................................ */
useEffect(() => {
  axios.get('/news?publishState=2&_expand=category')
  .then(res=>{
    console.log(res.data);
    renderBarView(_.groupBy(res.data,item=>item.category.title))/* groupBy 按照第二个参数分组 */
  })
  return()=>{
    window.resize=null
  }
}, [])
const renderBarView=(obj)=>{
  console.log(obj);
  var myChart = echarts.init(barRef.current);
  var option = {
    title: {
      text: '新闻分类图示'
    },
    tooltip: {},
    legend:{
        data:['数量'] 
    },
    xAxis: {
      data: Object.keys(obj),
      axisLabel:{
        rotate:"45",/* 旋转45度 */
        interval:0
    }
    },
    yAxis: {
      minInterval: 1 /* 最小间隔为1 */
    },
    series: [
      {
        name: '数量',
        type: 'bar',
        data: Object.values(obj).map(item=>item.length)
      }
    ]
};
myChart.setOption(option);
window.onresize=()=>{/* 窗口改变事件触发 */
  myChart.resize() /* 将内容变成响应式的 */
}
}
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={8}>
         <Card title={'用户最常浏览'} bordered={true}>
          <List
           size='small'
           dataSource={viewList}
           renderItem={item => <List.Item>
            <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
        </List.Item>}
    />
         </Card>
        </Col>
        <Col span={8}>
         <Card title={'用户最常浏览'} bordered={true}>
          <List
           size='small'
           dataSource={starList}
           renderItem={item => <List.Item>
            <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
        </List.Item>}
    />
         </Card>
        </Col>
        <Col span={8}>
         <Card
         cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" style={{width:'100%'}}/>}
         actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
         >
         <Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={username}
         description={
         <div>
          <b>{region?region:'全球'}</b>
          <span style={{paddingLeft:'30px'}}>
            {roleName}
          </span>
         </div>
         }
    />
         </Card>
        </Col>
      </Row>
      <div ref={barRef} style={{width:'100%',height:'400px',marginTop:'30px'}}>
  
      </div>
    </div>
  )
}
