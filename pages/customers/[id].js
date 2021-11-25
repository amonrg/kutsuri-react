import { Form, Input, Button, Switch } from 'antd'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
import React from 'react'

function Customer({ customer }) {
  const [disabled, setDisabled] = React.useState(true)

  const toggle = () => {
    setDisabled(!disabled)
  }

  return (
    <Form
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        'name': customer.name,
        'last_name': customer.last_name,
        'alias': customer.alias,
        'address': customer.address,
        'phone_number': customer.phone_number,
        'email': customer.email
      }}
    >
      <Form.Item label="ID">
        <span className="ant-form-text">{ customer.id }</span>
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
      >
        <Input disabled={disabled} />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="last_name"
      >
        <Input disabled={disabled} />
      </Form.Item>
      <Form.Item
        label="Alias"
        name="alias"
      >
        <Input disabled={disabled} />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
      >
        <Input disabled={disabled} />
      </Form.Item>
      <Form.Item
        label="Phone Number"
        name="phone_number"
      >
        <Input disabled={disabled} />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
      >
        <Input disabled={disabled} />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button disabled={disabled} type="primary" htmlType="submit">
          Save
        </Button>
        &nbsp;
        <Switch 
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          onChange={toggle}>
        </Switch>
      </Form.Item>
    </Form>
  );
}

export async function getStaticPaths() {
  const res = await fetch("http://192.168.1.94:8080/api/customers")
  const customers = await res.json()

  const paths = customers.map((customer) => ({
    params: { id: customer.id.toString() },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://192.168.1.94:8080/api/customers/${params.id}`)
  const customer = await res.json()

  return { props: { customer } }
}

export default Customer