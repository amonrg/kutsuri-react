import { Button, Typography } from 'antd'

const { Title } = Typography

export default function Home() {
  return (
    <>
    <Title>Consuming REST API Demo</Title>
    <Button type="primary" href="/customers">Customers</Button>
    </>
  )
}