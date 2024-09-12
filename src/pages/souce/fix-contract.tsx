import { Form, Input } from "antd";

function FixContract(props: {data: any}) {
  const {data} = props
  console.log(data)
  return <Form size="small" layout="horizontal">
    <Form.Item>
      <Input />
    </Form.Item>
    <Form.Item>
      <Input.TextArea />
    </Form.Item>
  </Form>
}

export default FixContract