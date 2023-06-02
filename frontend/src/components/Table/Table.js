import React, { useEffect, useState } from "react";
import { Avatar, List, message, Input, Col, Select } from "antd";
import VirtualList from "rc-virtual-list";
import "./Table.css";
import { useNavigate } from "react-router-dom";

const fakeDataUrl =
  "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo";
// 時間、地點、物品種類、remark
const options = [
  {
    value: "category",
    label: "category",
  },
  {
    value: "location",
    label: "loctaion",
  },
  {
    value: "time",
    label: "time",
  },
  {
    value: "remark",
    label: "remark",
  },
];
const ContainerHeight = 460;
const { Search } = Input;
const SearchTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        message.success(`${body.results.length} more items loaded!`);
      });
  };
  useEffect(() => {
    appendData();
  }, []);
  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      appendData();
    }
  };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Select size="large" defaultValue="category" options={options} />
        <Search placeholder="search" enterButton="Search" size="large" />
      </div>
      <List>
        <VirtualList
          data={data}
          height={ContainerHeight}
          itemHeight={20}
          itemKey="email"
          onScroll={onScroll}
        >
          {(item) => (
            <List.Item key={item.email}>
              <Col span={13}>
                <List.Item.Meta
                  className="list"
                  avatar={<Avatar src={item.picture.large} />}
                  title={
                    <a onClick={() => navigate("/detail/:id/:time")}>錢包</a>
                  }
                  description="可能掉在路燈旁邊的椅子上,或是在社科院的廁所裡面"
                />
              </Col>
              <Col span={3}>社科院</Col>
              <Col span={4}>2023-05-31 09:00:00</Col>
            </List.Item>
          )}
        </VirtualList>
      </List>
    </div>
  );
};
export default SearchTable;

// const StyledElement = styled(List)`
//   .ant-spin-container {
//     // box-shadow: 5px -5px 5px Gray;
//     border-radius: 10px;

//     border-color: #b3aaf7;
//   }
//   .ant-table-cell {
//     background-color: #c7c1f6;
//     // color: white;
//     &:hover{
//       background-color: #CC95C0;
//     }
//   }
//   .ant-table-column-has-sorters{
//     &:hover{
//       background-color: #CC95C0;
//     }
//   }
//   .ant-table-row {
//     // &:nth-child(even){
//     //   background-color: gray;
//     }

//   }
//   .ant-table-cell-row{
//       background-color: #faaca8;
//       &:hover{
//         background-color: #faaca8;
//       }
//     }
//   }

// `;
// const columns = [
//   {
//     title: "time",
//     dataIndex: "time",
//     sorter: (a, b) => Date.parse(a.time) - Date.parse(b.time),
//   },
//   {
//     title: "location",
//     dataIndex: "location",
//     filters: [
//       {
//         text: "社科院",
//         value: "社科院",
//         children: [
//           {
//             text: "社科圖",
//             value: "社科圖",
//           },
//           {
//             text: "經濟系",
//             value: "經濟系",
//           },
//         ],
//       },
//       {
//         text: "椰林大道",
//         value: "椰林大道",
//         children: [
//           {
//             text: "森林系",
//             value: "森林系",
//           },
//           {
//             text: "土木系",
//             value: "土木系",
//           },
//           {
//             text: "椰林大道近總圖",
//             value: "椰林大道近總圖",
//           },
//           {
//             text: "椰林大道近大門口",
//             value: "椰林大道近大門口",
//           },
//         ],
//       },
//       {
//         text: "桃花心木道",
//         value: "桃花心木道",
//         children: [
//           {
//             text: "計中",
//             value: "計中",
//           },
//           {
//             text: "外教",
//             value: "外教",
//           },
//         ],
//       },
//       {
//         text: "舟山路口",
//         value: "舟山路口",
//         children: [
//           {
//             text: "公館捷運站",
//             value: "公館捷運站",
//           },
//           {
//             text: "大一女宿",
//             value: "大一女宿",
//           },
//           {
//             text: "研一",
//             value: "研一",
//           },
//         ],
//       },
//       {
//         text: "楓香道",
//         value: "楓香道",
//         children: [
//           {
//             text: "資工系館",
//             value: "資工系館",
//           },
//           {
//             text: "電機系館",
//             value: "電機系館",
//           },
//           {
//             text: "工綜",
//             value: "工綜",
//           },
//         ],
//       },
//       {
//         text: "教學大樓",
//         value: "教學大樓",
//         children: [
//           {
//             text: "共同",
//             value: "共同",
//           },
//           {
//             text: "博雅",
//             value: "博雅",
//           },
//           {
//             text: "普通",
//             value: "普通",
//           },
//           {
//             text: "綜合",
//             value: "綜合",
//           },
//           {
//             text: "新生",
//             value: "新生",
//           },
//         ],
//       },
//       {
//         text: "二活＆管理學院",
//         value: "二活＆管理學院",
//         children: [
//           {
//             text: "管一",
//             value: "管一",
//           },
//           {
//             text: "管二",
//             value: "管二",
//           },
//           {
//             text: "二活",
//             value: "二活",
//           },
//         ],
//       },
//       {
//         text: "總圖書館",
//         value: "總圖書館",
//         children: [
//           {
//             text: "總圖前草皮",
//             value: "總圖前草皮",
//           },
//           {
//             text: "總圖後草皮",
//             value: "總圖後草皮",
//           },
//           {
//             text: "總圖館內",
//             value: "總圖館內",
//           },
//         ],
//       },
//       {
//         text: "體育場",
//         value: "體育場",
//         children: [
//           {
//             text: "舊體周圍",
//             value: "舊體周圍",
//           },
//           {
//             text: "新體",
//             value: "新體",
//           },
//           {
//             text: "田徑場",
//             value: "田徑場",
//           },
//           {
//             text: "網球場",
//             value: "網球場",
//           },
//         ],
//       },
//       {
//         text: "學餐",
//         value: "學餐",
//         children: [
//           {
//             text: "活大",
//             value: "活大",
//           },
//           {
//             text: "小福",
//             value: "小福",
//           },
//           {
//             text: "小小福",
//             value: "小小福",
//           },
//         ],
//       },
//       {
//         text: "其他",
//         value: "其他",
//       },
//     ],
//     onFilter: (value, record) => record.location.indexOf(value) === 0,
//   },
//   {
//     title: "category",
//     dataIndex: "Category",
//     sorter: (a, b) => a.ID > b.ID,
//   },
//   {
//     title: "remark",
//     dataIndex: "remark",
//     fixed: "right",
//     filters: [
//       {
//         text: "True",
//         value: "True",
//       },
//       {
//         text: "Not yet",
//         value: "Not yet",
//       },
//     ],
//     onFilter: (value, record) => record.founded.indexOf(value) === 0,
//   },
// ];

// const SearchTable = (data) => {
//   const navigate = useNavigate();
//   const toDetail = (record) => {
//     navigate("/Detail/" + record.ID + "/" + Date.parse(record.time));
//   };
//   return (
//     <ConfigProvider
//       theme={{
//         token: {
//           colorPrimary: "#faad14",
//         },
//       }}
//     >
//       <StyledElement
//         style={{ top: "100px", margin: "25px" }}
//         columns={columns}
//         dataSource={data.data}
//         rowKey={"_id"}
//         scroll={{ x: "200px", y: "calc(100vh - 160px)" }}
//         onRow={(record) => {
//           return {
//             onClick: (event) => {
//               toDetail(record);
//             },
//           };
//         }}
//       />
//     </ConfigProvider>
//   );
// };
// export default SearchTable;
