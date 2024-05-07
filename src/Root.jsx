import {useEffect, useState} from 'react';
import {
    DesktopOutlined, FieldTimeOutlined,
    PieChartOutlined,
    DiffOutlined
} from '@ant-design/icons';
import {Flex, Layout, Menu, theme} from 'antd';
import {useLocation, useNavigate} from "react-router-dom";

const {Header, Content, Footer, Sider} = Layout;

function getItem(
    label,
    key,
    path,
    icon,
    children,
) {
    return {
        key,
        icon,
        path,
        children,
        label,
    }
}

const items = [
    getItem('Base64', '1', '/base64', <PieChartOutlined/>),
    getItem('Generate string', '2', '/random', <DesktopOutlined/>),
    getItem('Convert timestamp', '3', '/time', <FieldTimeOutlined />),
    getItem('Compare text', '4', '/compare', <DiffOutlined />),
];

const Root = ({ children }) => {
    const location = useLocation()
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenuKey, setSelectedMenuKey] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const path = location.pathname;
        if (path === '/') {
            return;
        }
        const item = items.find((i => i.path === path))
        setSelectedMenuKey([item.key])
    }, [])

    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const handleClickToMenu = (key) => {
        const item = items.find((i) => i.key === key);
        navigate(item.path);
        window.history.pushState({path: '#' + item.path}, '')
    }

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical"/>
                <Menu theme="dark" selectedKeys={selectedMenuKey} items={items} onSelect={(e) => {
                    setSelectedMenuKey(e.selectedKeys)
                    handleClickToMenu(e.key)
                }}/>
            </Sider>
            <Layout>
                <Content style={{margin: '0 16px'}}>
                    <Flex style={{width: '100%'}} vertical align="center">
                        {children}
                    </Flex>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Root;