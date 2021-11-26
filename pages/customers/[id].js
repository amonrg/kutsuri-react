import { Form, Input, Button, Switch, notification } from 'antd'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
import React from 'react'

const endpoint = "http://192.168.1.64:8080/api/customers/"

async function putData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(() => {
    notification.success({
      message: 'Success',
      description: 'Customer successfully updated',
      duration: 3
    })
  })
  .catch(() => {
    notification.error({
      message: 'Error',
      description: 'Customer could not be updated',
      duration: 3
    })
  })
}

function Customer({ customer }) {
  const [disabled, setDisabled] = React.useState(true)

  const toggle = () => {
    setDisabled(!disabled)
  }

  const onFinish = (values) => {
    putData(`${endpoint}${values.id}`, values)
  }

  return (
    <Form
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{
        'id': customer.id,
        'name': customer.name,
        'last_name': customer.last_name,
        'alias': customer.alias,
        'address': customer.address,
        'phone_number': customer.phone_number,
        'email': customer.email
      }}
      onFinish={onFinish}
    >
      <Form.Item 
        label="ID" 
        name="id"
      >
        <Input disabled />
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
  const res = await fetch(endpoint)
  const customers = await res.json()

  const paths = customers.map((customer) => ({
    params: { id: customer.id.toString() },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${endpoint}${params.id}`)
  const customer = await res.json()

  return { props: { customer } }
}

export default Customer