import React from 'react';
import { Table, ConfigProvider } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Time',
    dataIndex: 'time',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.time - b.time,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: '圖書館',
        value: '圖書館',
      },
      {
        text: '社科院',
        value: '社科院',
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
  {
    title: 'Find',
    dataIndex: 'find',
    filters: [
        {
          text: 'found',
          value: 'found',
        },
        {
          text: 'Not yet',
          value: 'Not yet',
        },
      ],
      onFilter: (value, record) => record.find.indexOf(value) === 0,
  },
];
const data = [
  {
    key: '1',
    name: 'Jim Green',
    time: '2022/12/10',
    address: '圖書館',
    find: 'found'
  },
  {
    key: '2',
    name: 'John Brown',
    time: '2022/12/9',
    address: '圖書館',
    find: 'Not yet'
  },
  {
    key: '3',
    name: 'Joe Black',
    time: '2022/12/10',
    address: '圖書館',
    find: 'found'
  },
  {
    key: '4',
    name: 'R********',
    time: '2022/12/11',
    address: '社科院',
    find: 'found'
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
const table = () => <ConfigProvider 
theme={{token: {
  colorPrimary: "#faad14",
},
}}><Table style={{width:"500px", height:'400px'}} columns={columns} dataSource={data} onChange={onChange} /></ConfigProvider>;
export default table;