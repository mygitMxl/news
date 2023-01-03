import React, { useState } from 'react'
import { Layout, Dropdown, Menu, Avatar } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined
} from '@ant-design/icons';

const { Header } = Layout;

export default function TopHeader() {
    const [collapsed, setCollapsed] = useState(false)
    const changeCollapsed = () => {
        setCollapsed(!collapsed)
    }

    const items = [
        { label: '超级管理员', key: 'item-1' }, // 菜单项务必填写 key
        { label: '退出', danger: true, key: 'item-2' },
    ];

    return (
        <Header className="site-layout-background" style={{ padding: '0 16px' }}>
            {
                collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed} />
            }

            <div style={{ float: "right" }}>
                <span>欢迎admin回来</span>
                <Dropdown menu={{ items }}>
                    <Avatar  icon={<UserOutlined />} />
                </Dropdown>
            </div>
        </Header>

    )
}
