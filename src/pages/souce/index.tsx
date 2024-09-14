import {
  Card,
  DatePicker,
  Form,
  Popconfirm,
  Space,
  Table,
  Tag,
  Tree,
} from "antd";
import { useAuditSource, useCityTree } from "../../hooks/audit";
import { Key, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { useForm } from "antd/es/form/Form";
import FixContract from "./fix-contract";
import { FetchState } from "../../main";

function Source() {
  const { citieTree, getCitieTree, fetchState } = useCityTree();
  const {
    auditSources,
    getAuditSource,
    fetchState: fetchAuditState,
  } = useAuditSource();
  const params = useParams<{ id: string }>();
  const [search, setSearch] = useSearchParams();
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([
    params?.id as string,
  ]);
  const [begiontime, setBegiontime] = useState<string>(
    search.get("date") || dayjs().format("YYYY-MM-DD")
  );
  const [form] = useForm();

  useEffect(() => {
    getCitieTree({ collectTime: begiontime, type: "shenhe" });
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

  function handlerTreeClick(_: Key[], { node }: { node: CityTreeResult }) {
    getAuditSource({
      begiontime,
      stationid: node.id,
      stationname: node.name,
      state: "audit",
      smallstate: 0,
    });
    setSelectedKeys([node.id]);
  }

  function handlerFormChange(params: { begiontime: dayjs.Dayjs }) {
    const { begiontime } = params;
    const date = dayjs(begiontime).format("YYYY-MM-DD");
    setBegiontime(date);
    setSearch({ date });
  }

  function render(val: number, record: AuditSourceResults) {
    return val <= 0 ? (
      <Popconfirm
        icon={null}
        title=""
        trigger="click"
        description={<FixContract data={record} />}
      >
        <Tag color="red">{val}</Tag>
      </Popconfirm>
    ) : (
      val
    );
  }

  const sorter =
    (dataIndex: keyof AuditSourceResults) =>
    (a: AuditSourceResults, b: AuditSourceResults) =>
      (a[dataIndex] as number) - (b[dataIndex] as number);

  const filters = [
    {
      text: "小于零",
      value: "ltz",
    },
    {
      text: "等于零",
      value: "ez",
    },
  ];

  const onFilter =
    (dataIndex: keyof AuditSourceResults) =>
    (value: "ltz" | "ez" | boolean | Key, record: AuditSourceResults) => {
      switch (value) {
        case "ltz":
          return (record[dataIndex] as number) < 0;
        case "ez":
          return record[dataIndex] === 0;
        default:
          return true;
      }
    };

  const columnWithFun = ({
    title,
    dataIndex,
  }: {
    title: string;
    dataIndex: keyof AuditSourceResults;
  }) => ({
    title,
    dataIndex,
    render,
    sorter: sorter(dataIndex),
    filters,
    onFilter: onFilter(dataIndex),
  });

  return (
    <Space align="start">
      <Space direction="vertical" align="start">
        <Card size="small" style={{ width: 300 }}>
          <Form
            layout="inline"
            size="small"
            form={form}
            initialValues={{ begiontime: dayjs(begiontime) }}
            onValuesChange={handlerFormChange}
          >
            <Form.Item name="begiontime">
              <DatePicker maxDate={dayjs().subtract(1, "day")} />
            </Form.Item>
          </Form>
        </Card>
        <Card size="small" loading={fetchState === FetchState.Processing}>
          <Tree
            showLine
            onSelect={handlerTreeClick}
            expandedKeys={[
              (citieTree?.find((item) => !item.open) as CityTreeResult)?.id,
            ]}
            selectedKeys={selectedKeys}
            treeData={(citieTree || [])
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
        <Table<AuditSourceResults>
          size="small"
          scroll={{ x: 100, y: document.body.offsetHeight - 150 }}
          key="key"
          loading={fetchAuditState === FetchState.Processing}
          pagination={false}
          columns={[
            {
              title: "序号",
              dataIndex: "key",
              width: 60,
            },
            {
              title: "时间",
              dataIndex: "collecttime",
            },
            columnWithFun({
              title: "PM10(μg/m3)",
              dataIndex: "pm10_val",
            }),
            columnWithFun({
              title: "PM2.5(μg/m3)",
              dataIndex: "pm25_val",
            }),
            columnWithFun({
              title: "SO2(μg/m3)",
              dataIndex: "so2_val",
            }),
            columnWithFun({
              title: "NO2(μg/m3)",
              dataIndex: "no2_val",
            }),
            columnWithFun({
              title: "CO(mg/m3)",
              dataIndex: "co_val",
            }),
            columnWithFun({
              title: "O3(μg/m3)",
              dataIndex: "o3_val",
            }),
          ]}
          dataSource={auditSources
            .filter((item) => {
              return dayjs(item.collecttime).toString() !== "Invalid Date";
            })
            .map((item, key) => ({ ...item, key: key + 1 }))}
        />
      </Card>
    </Space>
  );
}

export default Source;
