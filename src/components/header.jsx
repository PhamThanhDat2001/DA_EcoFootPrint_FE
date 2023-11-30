import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
  
  
  {
    // label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: <UserOutlined />,
    children: [
      {
        type: 'group',
        children: [
          {
            label: 'Hồ sơ',
            key: 'setting:1',
          },
          {
            label: 'Đổi mật khẩu',
            key: 'setting:2',
          },
          {
            label: 'Đăng xuất',
            key: 'setting:3',
          },
        ],
      },
     
    ],
  },

];
const Navbar = () => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default Navbar;