import React, { useEffect, useState } from "react";
import { Card, DatePicker, Form, Space, Table } from "antd";
import dayjs from 'dayjs'
import auditApi from "../../apis/audit";
import "./index.css";

const Audit: React.FC = () => {
  const [list, setList] = useState<AduitResult[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await auditApi().list({
        begiontime: "2024-09-02",
        endtime: "2024-09-09",
      });
      if (Array.isArray(data)) {
        setList(data);
      }
    })();
  }, []);

  return (
    <Space direction="vertical"  style={{width: '100%'}}>
      <Card size="small" title="审核概况">
        <Form layout="inline">
          <Form.Item name="daterange">
            <DatePicker.RangePicker format={'YYYY-MM-DD'} defaultValue={[dayjs(new Date()).subtract(7, 'day'), dayjs(new Date())]} />
          </Form.Item>
        </Form>
      </Card>
      <Table
        key="key"
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
    </Space>
  );
};

export default Audit;
