import { PlusOutlined } from '@ant-design/icons'
import { Button, Table, Tooltip, Space, Typography, Breadcrumb, Modal, Form, Input, notification } from 'antd'
import React from 'react'
import { CUSTOMERS_ENDPOINT } from '../../lib/constants'

function CustomersTable({ customers }) {
  const [visible, setVisible] = React.useState(false)
  const [confirmLoading, setConfirmLoading] = React.useState(false)
  const [form] = Form.useForm()

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    setConfirmLoading(true)

    form.validateFields()
      .then((values) => {
        onAdd(values)
      })
  }

  const onAdd = async (values) => {
    const response = await fetch(CUSTOMERS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    .then(response => response.json())
    .then(() => {
      setConfirmLoading(false)
      setVisible(false)
    })
    .catch((error) => {
      setConfirmLoading(false)
      notification.error({
        message: 'Error',
        description: error,
        duration: 3
      })
    })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: id => <a href={`/customers/${id}`}>{id}</a>
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name'
    },
    {
      title: 'Alias',
      dataIndex: 'alias',
      key: 'alias'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    }
  ];
  const { Title } = Typography
  return (
    <>
    <Breadcrumb>
      <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
      <Breadcrumb.Item>Customers Table</Breadcrumb.Item>
    </Breadcrumb>
    <Title level={2}>Customers</Title>
    <Table dataSource={customers} columns={columns} rowKey="id" />
    <Tooltip title="Add new customer">
      <Space size="large">
        &nbsp;
        <Button 
          type="primary" 
          shape="circle" 
          icon={<PlusOutlined />} 
          size="large" 
          onClick={showModal}
        ></Button>
        <Modal
          title="Add new customer"
          visible={visible}
          okText="Add"
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={() => setVisible(false)}
        >
          <Form
            form={form}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}
          >
            <Form.Item
              label="Name"
              name="name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="last_name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Alias"
              name="alias"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phone_number"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Space>
    </Tooltip>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch(CUSTOMERS_ENDPOINT)
  const customers = await res.json()
  return {
    props: { 
      customers,
    },
  }
}

export default CustomersTable