import { Table } from 'antd'

function CustomersTable({ customers }) {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
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
  return <Table dataSource={customers} columns={columns} />
}

export async function getStaticProps() {
  const res = await fetch("http://192.168.1.94:8080/api/customers")
  const customers = await res.json()
  return {
    props: { 
      customers, 
    },
  }
}

export default CustomersTable