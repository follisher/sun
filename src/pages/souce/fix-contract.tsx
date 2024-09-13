import { Form, Input, Tabs } from "antd";
import { useEffect } from "react";

function FixContract(props: { data: AuditSourceResults }) {
  const { data } = props;
  useEffect(() => {}, [data]);
  return (
    <Tabs
      size="small"
      type="line"
      items={[
        {
          key: "1",
          label: "修约",
          children: (
            <Form size="small" layout="horizontal">
              <Form.Item>
                <Input />
              </Form.Item>
              <Form.Item>
                <Input.TextArea />
              </Form.Item>
            </Form>
          ),
        },
      ]}
    />
  );
}

export default FixContract;
