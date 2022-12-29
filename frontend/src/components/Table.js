import React from 'react';
import { Table, ConfigProvider } from 'antd';
const columns = [
  {
    title: 'ID',
    dataIndex: 'ID',
    sorter: (a, b) => a.ID > b.ID,
  },
  {
    title: 'time',
    dataIndex: 'time',
    sorter: (a, b) => Date.parse(a.time) - Date.parse(b.time),
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
    onFilter: (value, record) => record.location.indexOf(value) === 0,
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
      onFilter: (value, record) => record.founded.indexOf(value) === 0,
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