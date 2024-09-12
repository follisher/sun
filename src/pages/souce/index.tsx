import { Card, DatePicker, Form, Popconfirm, Space, Table, Tag, Tree } from "antd";
import { useAuditSource, useCityTree } from "../../hooks/audit";
import { Key, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import dayjs from 'dayjs'
import { useForm } from "antd/es/form/Form";
import FixContract from "./fix-contract";

function Source() {
  const { citieTree, getCitieTree } = useCityTree();
  const { auditSources, getAuditSource } = useAuditSource();
  const params = useParams<{ id: string }>();
  const [search, setSearch] = useSearchParams()
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([params?.id as string]);
  const [begiontime, setBegiontime] = useState<string>(search.get('date') || dayjs().format('YYYY-MM-DD'))
  const [form] = useForm()

  useEffect(() => {
    getCitieTree({ collectTime: begiontime, type: 'shenhe' });
  }, [begiontime]);

  useEffect(() => {
    if (citieTree.length > 0 && params.id) {
      const city = citieTree.find((item) => item.id === params.id);
      if (!city) return;
      getAuditSource({
        begiontime,
        stationid: city.id,
        stationname: city.name,
        state: "audit",
        smallstate: 0,
      });
    }
  }, [citieTree]);

  function handlerTreeClick(_: Key[], { node }: { node: cityTreeResult }) {
    getAuditSource({
      begiontime,
      stationid: node.id,
      stationname: node.name,
      state: "audit",
      smallstate: 0,
    });
    setSelectedKeys([node.id])
  }

  function handlerFormChange(params: { begiontime: dayjs.Dayjs }) {
    const { begiontime } = params
    const date = dayjs(begiontime).format('YYYY-MM-DD')
    setBegiontime(date)
    setSearch({ date })
  }

  function render(val: number, record: any) {
    return val < 0 ? <Popconfirm title="修约" trigger="click" description={<FixContract data={record} />}><Tag color="red">{val}</Tag></Popconfirm> : val
  }

  return (
    <Space align="start">
      <Space direction="vertical">
        <Card size="small" style={{ width: 300 }}>
          <Form layout="inline" size="small" form={form} initialValues={{ begiontime: dayjs(begiontime) }} onValuesChange={handlerFormChange}>
            <Form.Item name="begiontime">
              <DatePicker maxDate={dayjs().subtract(1, 'day')} />
            </Form.Item>
          </Form>
        </Card>
        <Card size="small" >
          <Tree
            showLine
            onSelect={handlerTreeClick}
            expandedKeys={[
              (citieTree.find((item) => !item.open) as cityTreeResult)?.id,
            ]}
            selectedKeys={selectedKeys}
            treeData={citieTree
              .filter((item) => !item.open)
              .map((item) => {
                return {
                  id: item.id,
                  key: item.id,
                  title: item.name,
                  pId: item.pId,
                  open: item.open,
                  name: item.name,
                  children: citieTree
                    .filter((child) => child.pId === item.id)
                    .map((child) => {
                      return {
                        id: child.id,
                        key: child.id,
                        title: child.name,
                        pId: child.pId,
                        open: child.open,
                        name: child.name,
                      };
                    }),
                };
              })}
          />
        </Card>
      </Space>
      <Card size="small">
        <Table
          size="small"
          scroll={{ x: 100, y: document.body.offsetHeight - 260 }} key="key" columns={[{
            title: '序号',
            dataIndex: 'key'
          }, {
            title: '时间',
            dataIndex: 'collecttime',
            render(val) {
              return dayjs(val).format('YYYY-MM-DD')
            }
          }, {
            title: 'PM10(μg/m3)',
            dataIndex: 'pm10_val',
            render
          }, {
            title: 'PM2.5(μg/m3)',
            dataIndex: 'pm25_val',
            render
          }, {
            title: 'SO2(μg/m3)',
            dataIndex: 'so2_val',
            render
          }, {
            title: 'NO2(μg/m3)',
            dataIndex: 'no2_val',
            render
          }, {
            title: 'CO(mg/m3)',
            dataIndex: 'co_val',
            render
          }, {
            title: 'O3(μg/m3)',
            dataIndex: 'o3_val',
            render
          }]} dataSource={auditSources.filter(item => { return dayjs(item.collecttime).toString() !== 'Invalid Date' }).map((item, key) => ({ ...item, key: key + 1 }))} />
      </Card>
    </Space>
  );
}

export default Source;
