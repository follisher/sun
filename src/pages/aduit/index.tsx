import React, { useEffect, useState } from "react";
import { Table } from "antd";
import audit from "../../apis/audit";
import "./index.css";

const Audit: React.FC = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await audit().list({
        begiontime: "2024-09-02",
        endtime: "2024-09-09",
      });
      if (Array.isArray(data)) {
        setList(data);
      }
    })();
  }, []);

  return (
    <>
      <Table
        size="small"
        dataSource={list}
        columns={[
          {
            title: "序号",
            dataIndex: "",
          },
          {
            title: "日期",
            dataIndex: "collecttime",
          },
          {
            title: "未审核",
            dataIndex: "wsh",
          },
          {
            title: "待上报",
            dataIndex: "sb",
          },
          {
            title: "复核退回",
            dataIndex: "fhth",
          },
        ]}
      />
    </>
  );
};

export default Audit;
