import { Table } from "antd";
import { useTranslation } from "react-i18next";

const Tab = ({ data, image }) => {
  const { t } = useTranslation();
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
      name: t("category"),
      description: data.category,
    },
    {
      key: 2,
      name: t("found_location"),
      description: data.found_location ? data.found_location.location : "",
    },
    {
      key: 3,
      name: t("retrieve_location"),
      description: data.retrieve_location
        ? data.retrieve_location.location
        : "",
    },
    {
      key: 4,
      name: t("time"),
      description: new Date(data.time).toLocaleString(),
    },
    {
      key: 5,
      name: t("remark"),
      description: data.remark,
    },
    {
      key: 6,
      name: t("mislayer_clue"),
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
