import { Card, Col, Row, List, Avatar, Drawer } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import * as echarts from 'echarts';
import _ from 'lodash'
const { Meta } = Card;
export default function Home() {
  const [viewList, setviewList] = useState([])/* 观看数量 */
  const [starList, setstarList] = useState([])/* 点赞数量 */
  const [visble, setvisble] = useState(false)/* 开关 */
  const [allList, setallList] = useState([])/* 所有信息 */
  const [pieChart, setpieChart] = useState(null)
  const barRef = useRef()
  const pieRef = useRef()
  const { username, region, role: { roleName } } = JSON.parse(localStorage.getItem('token'))
  useEffect(() => {/* _sort:正序,_order=desc反序,_limit限制条数*/
    axios.get("/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6").then(res => {
      setviewList(res.data)
    })
  }, [])
  useEffect(() => {
    axios.get('/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6')
      .then(res => {
        console.log(res.data);
        setstarList(res.data)
      })
  }, [])

  /* ................................................ */
  useEffect(() => {
    axios.get('/news?publishState=2&_expand=category')
      .then(res => {
        console.log(res.data);
        renderBarView(_.groupBy(res.data, item => item.category.title))/* groupBy 按照第二个参数分组 */
        setallList(res.data)
      })
    return () => {
      window.resize = null/* 清除事件 */
    }
  }, [])
  /* 柱状图 */
  const renderBarView = (obj) => {
    console.log(obj);
    var myChart = echarts.init(barRef.current);
    var option = {
      title: {
        text: '新闻分类图示'
      },
      tooltip: {},
      legend: {
        data: ['数量']
      },
      xAxis: {
        data: Object.keys(obj),
        axisLabel: {
          rotate: "45",/* 旋转45度 */
          interval: 0
        }
      },
      yAxis: {
        minInterval: 1 /* 最小间隔为1 */
      },
      series: [
        {
          name: '数量',
          type: 'bar',
          data: Object.values(obj).map(item => item.length)
        }
      ]
    };
    myChart.setOption(option);
    window.onresize = () => {/* 窗口改变事件触发 */
      myChart.resize() /* 将内容变成响应式的 */
    }
  }
  /* .................................................... */
  //饼形图
  const renderPieView = () => {
    let currentList = allList.filter(item => item.author === username)
    let groupObj = _.groupBy(currentList, item => item.category.title)/* 将过滤好的数据分类 */
    var list = []
    for(var i in groupObj){
        list.push({
            name:i,
            value:groupObj[i].length
        })
    }
    var myChart
    if (!pieChart) {/* 防止重复获取dom */
    myChart=echarts.init(pieRef.current);/*获取dom节点 */
      setpieChart(myChart)
    } else {
      myChart = pieChart
    }
    var option = {
      title: {
        text: '当前用户新闻分类图示',
        left: 'left'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'right'
      },
      series: [
        {
          name: '发布数量',
          type: 'pie',
          radius: '50%',
          data: list,
          center: ['50%', '55%'],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    option && myChart.setOption(option);
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
            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" style={{ width: '100%' }} />}
            actions={[
              <SettingOutlined key="setting" onClick={() => {
                setTimeout(() => {/* 放在计时器里,setstate变成同步,就不会出现,开关还没开,内容出现的错误 */
                  setvisble(true)
                  renderPieView()
                }, 0)
              }} />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={username}
              description={
                <div>
                  <b>{region ? region : '全球'}</b>
                  <span style={{ paddingLeft: '30px' }}>
                    {roleName}
                  </span>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>
      <Drawer title="个人新闻分类" placement="right" onClose={() => { setvisble(false) }} open={visble}>
        <div ref={pieRef} style={{ width: '100%', height: '400px', marginTop: '30px' }}></div>
      </Drawer>
      <div ref={barRef} style={{ width: '100%', height: '400px', marginTop: '30px' }}></div>
    </div>
  )
}
