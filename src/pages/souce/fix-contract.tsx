import { Button, Form, Input, Popconfirm, Tabs } from "antd";
import { FetchState } from "../../main";
import { useAuditSave } from "../../hooks/audit";

function FixContract(props: {
  target: string;
  value: number;
  data: AuditSourceResults;
}) {
  const { data, value, target } = props;
  const [form] = Form.useForm<{ value: number; remark: string }>();
  const { fetchState } = useAuditSave();
  const handlerConfirm = async () => {
    const { value, remark } = await form.validateFields();
    const { stationid, stationname, collecttime, areapath } = data;
    const params: AuditDataType = {
      state: "audit",
      stationid,
      stationname,
      row: `${collecttime},${value}#${value},${target}`,
      areapath,
      type: 22,
      remark,
    };
    console.log(params);
    // saveAudit(params);
  };
  return (
    <Popconfirm
      icon={null}
      title=""
      trigger="click"
      onConfirm={handlerConfirm}
      okButtonProps={{ loading: fetchState === FetchState.Processing }}
      description={
        <Tabs
          size="small"
          type="line"
          tabPosition="left"
          items={[
            {
              key: "1",
              label: "修约",
              children: (
                <Form
                  form={form}
                  layout="horizontal"
                  initialValues={{ value: 1, remark: "已修约" }}
                >
                  <Form.Item
                    label={String(target).toLocaleUpperCase()}
                    name="value"
                    rules={[{ required: true }]}
                  >
                    <Input type="number" min={1} />
                  </Form.Item>
                  <Form.Item
                    label="备注"
                    name="remark"
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea allowClear />
                  </Form.Item>
                </Form>
              ),
            },
          ]}
        />
      }
    >
      <Button size="small" danger>
        {value}
      </Button>
    </Popconfirm>
  );
}

export default FixContract;
