import { useEffect } from "react";
import { Card, DatePicker, Form, Input, Select, Space, Table } from "antd";
import { useCities } from "../../hooks/public";
import { useAuditDetail } from "../../hooks/audit";
import dayjs from "dayjs";
import router from "../../router";

function Detail() {
  const { cities, getCities } = useCities();
  const { auditDetails, getAuditDetail } = useAuditDetail();
  const [form] = Form.useForm();

  useEffect(() => {
    getCities();
    handlerFormChange();
  }, []);

  function handlerFormChange() {
    const formData = form.getFieldsValue();
    getAuditDetail({
      begiontime: formData.daterange[0].format("YYYY-MM-DD"),
      endtime: formData.daterange[1].format("YYYY-MM-DD"),
      areapath: formData.areapath,
      statetype: "audit",
      state: formData.state,
    });
  }

  function navigateToSource(record: AduitDetailResults) {
    router.navigate(`/source/${record.stationid}?date=${record.collecttime}`);
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Card size="small" title="审核详情">
        <Form
          form={form}
          layout="inline"
          onValuesChange={handlerFormChange}
          initialValues={{ daterange: [dayjs().subtract(3, "day"), dayjs()] }}
        >
          <Form.Item name="daterange">
            <DatePicker.RangePicker />
          </Form.Item>
          <Form.Item name="areapath">
            <Select
              placeholder="城市"
              options={cities?.map((city) => ({
                label: city.name,
                value: city.nodecode,
              }))}
            />
          </Form.Item>
          <Form.Item name="key">
            <Input placeholder="请输入关键字" />
          </Form.Item>
          <Form.Item name="state">
            <Select
              placeholder="状态"
              options={[
                { label: "全部", value: "" },
                { label: "未审核", value: 0 },
                { label: "已审核", value: "shenhe" },
                { lable: "已上报", value: "shangbao" },
                { lable: "已退回", value: "tuihui" },
              ]}
            />
          </Form.Item>
        </Form>
      </Card>
      <Table
        key={"key"}
        size="small"
        dataSource={auditDetails}
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
            title: "站点名称",
            dataIndex: "stationname",
            render: (text, record) => (
              <a onClick={() => navigateToSource(record)}>{text}</a>
            ),
          },
          {
            title: "审核状态",
            dataIndex: "sb",
          },
          {
            title: "审核人",
            dataIndex: "auditusername",
          },
          {
            title: "审核时间",
            dataIndex: "auditdate",
          },
        ]}
      />
    </Space>
  );
}

export default Detail;
