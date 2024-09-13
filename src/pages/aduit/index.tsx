import React, { useEffect } from "react";
import { Card, DatePicker, Form, Space, Table } from "antd";
import dayjs from "dayjs";
import "./index.css";
import { useAudit } from "../../hooks/audit";
import { FetchState } from "../../main";

const Audit: React.FC = () => {
  const { getAuditList, audits, fetchState } = useAudit();
  const [form] = Form.useForm();

  useEffect(() => {
    handlerFormChanged();
  }, []);

  function handlerFormChanged() {
    const formData = form.getFieldsValue();
    getAuditList({
      begiontime: formData.daterange[0].format("YYYY-MM-DD"),
      endtime: formData.daterange[1].format("YYYY-MM-DD"),
    });
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Card size="small" title="审核概况">
        <Form
          form={form}
          layout="inline"
          onValuesChange={handlerFormChanged}
          initialValues={{
            daterange: [dayjs().subtract(7, "day"), dayjs()],
          }}
        >
          <Form.Item name="daterange">
            <DatePicker.RangePicker format={"YYYY-MM-DD"} />
          </Form.Item>
        </Form>
      </Card>
      <Table
        key="key"
        size="small"
        loading={fetchState === FetchState.Processing}
        dataSource={audits.map((item, index) => {
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
