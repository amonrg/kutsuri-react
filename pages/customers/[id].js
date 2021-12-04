import { Form, Input, Button, Switch, notification, Breadcrumb } from 'antd'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
import React from 'react'
import { CUSTOMERS_ENDPOINT } from '../../lib/constants'

async function putData(url = '', data = {}) {
  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      notification.success({
        message: 'Success',
        description: 'Customer successfully updated',
        duration: 3
      })
    } else {
      notification.error({
        message: 'Error',
        description: 'Customer could not be updated',
        duration: 5
      })
    }
  })
  .catch(error => {
    notification.error({
      message: 'Error',
      description: 'Customer could not be updated: ' + error,
      duration: 5
    })
  })
}

function Customer({ customer }) {
  const [disabled, setDisabled] = React.useState(true)

  const toggle = () => {
    setDisabled(!disabled)
  }

  const onFinish = (values) => {
    putData(`${CUSTOMERS_ENDPOINT}${values.id}`, values)
  }

  return (
    <>
    <Breadcrumb>
      <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
      <Breadcrumb.Item><a href="/customers/">Customers Table</a></Breadcrumb.Item>
      <Breadcrumb.Item>{customer.id}</Breadcrumb.Item>
    </Breadcrumb>
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
        rules={[{ required: true, message: 'Please input a name' }]}
      >
        <Input disabled={disabled} />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="last_name"
        rules={[{ required: true, message: 'Please input a last name' }]}
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
        rules={[{ required: true, message: 'Please input an address' }]}
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
        &nbsp;
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          onChange={toggle}>
        </Switch>
      </Form.Item>
    </Form>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(CUSTOMERS_ENDPOINT)
  const customers = await res.json()

  const paths = customers.map((customer) => ({
    params: { id: customer.id.toString() },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${CUSTOMERS_ENDPOINT}${params.id}`)
  const customer = await res.json()

  return { props: { customer } }
}

export default Customer