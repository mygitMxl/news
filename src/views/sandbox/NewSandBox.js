import { Layout } from 'antd'
import React, { useEffect } from 'react'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import NewRouter from '../../components/sandbox/NewRouter'
import Nprogress from 'nprogress'//进度条
import 'nprogress/nprogress.css'/* 引入css */
import './NewsSandBox.css'
const { Content } = Layout;
export default function NewSandBox() {
    Nprogress.start()
    useEffect(() => {
        Nprogress.done()
    })
    return (
        <Layout style={{ position: 'top:0 bottom:0 left:0 right:0 ' }}>
            <SideMenu />
            <Layout className="site-layout">
                <TopHeader />
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        overflow: "auto"
                    }}
                >
                    <NewRouter />
                </Content>
            </Layout>

        </Layout>
    )
}
