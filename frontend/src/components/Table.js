import React from 'react';
import { Table, ConfigProvider } from 'antd';
const columns = [
  {
    title: 'ID',
    dataIndex: 'ID',
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
    title: 'time',
    dataIndex: 'time',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.time - b.time,
  },
  {
    title: 'location',
    dataIndex: 'location',
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
    title: 'founded',
    dataIndex: 'founded',
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

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
const table = (data) => {
return(<ConfigProvider 
theme={{token: {
  colorPrimary: "#faad14",
},
// }}><Table style={{width:"500px", height:'400px',top:"100px"}} columns={columns} dataSource={data} onChange={onChange} /></ConfigProvider>;
}}><Table style={{ height:'400px',top:"100px"}} columns={columns} dataSource={data.data} onChange={onChange} rowKey={'_id'}/></ConfigProvider>
)
}
export default table;