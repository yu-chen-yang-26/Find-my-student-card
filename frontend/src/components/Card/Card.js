import { Table } from "antd";

const Tab = ({ data, image }) => {
  const fixedColumns = [
    {
      title: "Column",
      dataIndex: "name",
      fixed: true,
      width: 150,
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 450,
    },
  ];
  const fixedData = [
    {
      key: 1,
      name: "category",
      description: data.category,
    },
    {
      key: 2,
      name: "found_location",
      description: data.found_location ? data.found_location.location : "",
    },
    {
      key: 3,
      name: "retrieve_location",
      description: data.retrieve_location
        ? data.retrieve_location.location
        : "",
    },
    {
      key: 4,
      name: "time",
      description: new Date(data.time).toLocaleString(),
    },
    {
      key: 5,
      name: "remark",
      description: data.remark,
    },
    {
      key: 6,
      name: "mislayer_clue",
      description: data.mislayer_clue
        ? (data.mislayer_clue.student_id
            ? data.mislayer_clue.student_id
            : "None") +
          "/" +
          (data.mislayer_clue.name ? data.mislayer_clue.name : "None")
        : "None/None",
    },
  ];
  return (
    <Table
      columns={fixedColumns}
      showHeader={false}
      dataSource={fixedData}
      pagination={false}
      bordered
      style={{ height: "55%", width: "100%", overflowY: "scroll" }}
    />
  );
};

export default Tab;
