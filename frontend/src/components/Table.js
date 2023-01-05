import React from 'react';
import { Table, ConfigProvider } from 'antd';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
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
        text: '社科院',
        value: '社科院',
        children: [
          {
            text: '社科圖',
            value: '社科圖',
          },
          {
            text: '經濟系',
            value: '經濟系',
          }
        ],
      },
      {
        text: '椰林大道',
        value: '椰林大道',
        children: [
          {
            text: '森林系',
            value: '森林系',
          },
          {
            text: '土木系',
            value: '土木系',
          },
          {
            text: '椰林大道近總圖',
            value: '椰林大道近總圖',
          },
          {
            text: '椰林大道近大門口',
            value: '椰林大道近大門口',
          }
        ],
        },
      {
        text: '桃花心木道',
        value: '桃花心木道',
        children: [
          {
            text: '計中',
            value: '計中',
          },
          {
            text: '外教',
            value: '外教',
          }
        ],
      },
      {
        text: '舟山路口',
        value: '舟山路口',
        children: [
          {
            text: '公館捷運站',
            value: '公館捷運站',
          },
          {
            text: '大一女宿',
            value: '大一女宿',
          },
          {
            text: '研一',
            value: '研一',
          }
        ],
      },
      {
        text: '楓香道',
        value: '楓香道',
        children: [
          {
            text: '資工系館',
            value: '資工系館',
          },
          {
            text: '電機系館',
            value: '電機系館',
          },
          {
            text: '工綜',
            value: '工綜',
          }
        ],
      },
      {
        text: '教學大樓',
        value: '教學大樓',
        children: [
          {
            text: '共同',
            value: '共同',
          },
          {
            text: '博雅',
            value: '博雅',
          },
          {
            text: '普通',
            value: '普通',
          },
          {
            text: '綜合',
            value: '綜合',
          },
          {
            text: '新生',
            value: '新生',
          }
        ],
      },
      {
        text: '二活＆管理學院',
        value: '二活＆管理學院',
        children: [
          {
            text: '管一',
            value: '管一',
          },
          {
            text: '管二',
            value: '管二',
          },
          {
            text: '二活',
            value: '二活',
          }
        ],
      },
      {
        text: '總圖書館',
        value: '總圖書館',
        children: [
          {
            text: '總圖前草皮',
            value: '總圖前草皮',
          },
          {
            text: '總圖後草皮',
            value: '總圖後草皮',
          },
          {
            text: '總圖館內',
            value: '總圖館內',
          }
        ],
      },
      {
        text: '體育場',
        value: '體育場',
        children: [
          {
            text: '舊體周圍',
            value: '舊體周圍',
          },
          {
            text: '新體',
            value: '新體',
          },
          {
            text: '田徑場',
            value: '田徑場',
          },
          {
            text: '網球場',
            value: '網球場',
          }
        ],
      },
      {
        text: '學餐',
        value: '學餐',
        children: [
          {
            text: '活大',
            value: '活大',
          },
          {
            text: '小福',
            value: '小福',
          },
          {
            text: '小小福',
            value: '小小福',
          }
        ],
      },
      {
        text: "其他",
        value: "其他",
      }
    ],
    onFilter: (value, record) => record.location.indexOf(value) === 0,
  },
  {
    title: 'founded',
    dataIndex: 'founded',
    fixed: 'right',
    filters: [
      {
        text: 'True',
        value: 'True',
      },
      {
        text: 'Not yet',
        value: 'Not yet',
      },
    ],
    onFilter: (value, record) => record.founded.indexOf(value) === 0,
  },
];

const SearchTable = (data) => {
  const navigate = useNavigate();
  const toDetail = (record) => {
    navigate('/Detail/'+record.ID+'/'+Date.parse(record.time));
  }
  return (<ConfigProvider
    theme={{
      token: {
        colorPrimary: "#faad14",
      },
    }}><StyledElement style={{  top: "100px", margin: "25px" }} columns={columns} dataSource={data.data} rowKey={'_id'}
      scroll={{ x: "450px", y: 'calc(100vh - 410px)' }}
      onRow={record => {
        return {
          onClick: event => { toDetail(record) }
        }}}
       /></ConfigProvider>
       
  )
}
export default SearchTable; 