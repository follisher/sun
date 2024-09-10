import { useEffect, useState } from "react";
import audit from "../../apis/audit";
import { Table } from "antd";

function Detail() {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await audit().detail({
        begiontime: "2024-09-02",
        endtime: "2024-09-09",
        areapath: "000000_970000_97120000_97122400",
        statetype: "audit",
        state: 0,
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
}

export default Detail;
