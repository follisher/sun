import { useEffect, useState } from "react";
import auditApi from "../../apis/audit";
import { Card, DatePicker, Form, Input, Select, Space, Table } from "antd";
import { publicApi } from "../../apis/public";

function Detail() {
  const [list, setList] = useState([]);
  const [cities, setCities] = useState([])
  useEffect(() => {
    (async () => {
      const {data: cityData} = await publicApi().getCities()
      if (Array.isArray(cities)) { setCities(cityData)}
      const { data } = await auditApi().detail({
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
    <Space direction="vertical" style={{width: '100%'}}>
      <Card size="small" title="审核详情">
        <Form layout="inline">
          <Form.Item name="daterange">
            <DatePicker.RangePicker />
          </Form.Item>
          <Form.Item name="areapath">
            <Select placeholder="城市" options={cities?.map(city => ({
              label: city.name,
              value: city.nodecode,
            }))} />
          </Form.Item>
          <Form.Item name="key">
            <Input placeholder="请输入关键字" />
          </Form.Item>
          <Form.Item name="state">
            <Select placeholder="状态" options={[{ label: '全部', value: '' }, { label: '未审核', value: 0 }, { label: '已审核', value: 'shenhe' }, { lable: '已上报', value: 'shangbao' }, { lable: '已退回', value: 'tuihui' }]} />
          </Form.Item>
        </Form>
      </Card>
      <Table
        key={'key'}
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
            title: "站点名称",
            dataIndex: "stationname",
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
