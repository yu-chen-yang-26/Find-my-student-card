import React from 'react';
import { Table, ConfigProvider } from 'antd';
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
const StyledElement = styled(Table)`
  .ant-spin-container {
    // background-color: #C9D6FF;
    box-shadow: 5px -5px 5px Gray;
  }
  .ant-table-cell {
    background-color: #C4E0E5;
    // color: white;
    &:hover{
      background-color: #CC95C0;
    }
  }
  .ant-table-column-has-sorters{
    &:hover{
      background-color: #CC95C0;
    }
  }
  .ant-table-row {
    // &:nth-child(even){
    //   background-color: gray;
    }
   
  }
  .ant-table-cell-row{
      background-color: #faaca8;
      &:hover{
        background-color: #faaca8;
      }
    }
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
    fixed: 'right',
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
const SearchTable = (data) => {
  const navigate = useNavigate();
  const toDetail = (record) => {
    const id = record.ID
    console.log(id)
    navigate('/Detail/' );
        }
  return (<ConfigProvider
    theme={{
      token: {
        colorPrimary: "#faad14",
      },
      // }}><Table style={{width:"500px", height:'400px',top:"100px"}} columns={columns} dataSource={data} onChange={onChange} /></ConfigProvider>;
    }}><StyledElement style={{  top: "100px", margin: "25px" }} columns={columns} dataSource={data.data} onChange={onChange} rowKey={'_id'}
      scroll={{ x: "450px", y: 'calc(100vh - 410px)' }}
      onRow={record => {
        return {
          onClick: event => { toDetail(record) }
        }}}
        // rowClassName = {this.setClassName}
       /></ConfigProvider>
       
  )
}
export default SearchTable; 