import React from 'react';
import { Table, ConfigProvider } from 'antd';
import styled from 'styled-components'
const StyledElement = styled(Table)`
  .ant-table-wrapper {
    width: 98%;
    height: 100%;
    position: relative;
    top: 30px;
  }
  .ant-table {
    background-color: rgb(9,100,100);
    color: white;
  }
`
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
}}><Table style={{ height:'400px',top:"100px"}} columns={columns} dataSource={data.data} onChange={onChange} rowKey={'_id'}
          scroll={{y:'calc(100vh - 400px)'}}/></ConfigProvider>
)
}
export default table;