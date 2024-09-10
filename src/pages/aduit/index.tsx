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
        dataSource={list.map((item, index) => {
          return {
            ...item,
            key: index + 1,
            wsh: item.wsh || 0,
            sh: item.sh || 0,
            sb: item.sb || 0,
            fhth: item.fhth || 0,
          };
        })}
        columns={[
          {
            title: "序号",
            dataIndex: "key",
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
            title: "已审核",
            dataIndex: "sh",
          },
          {
            title: "已审核并上报",
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
