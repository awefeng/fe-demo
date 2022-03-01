import { FC, Fragment } from 'react'
import { Form, Input, Button } from 'antd'

const Login: FC = () => {
  const onFinish = (user) => {
    console.log(user)
  }

  return (
    <Fragment>
      <h2>欢迎登录</h2>
      <p>
        用户名：awe
        <br />
        密码：666
      </p>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete='off'
      >
        <Form.Item
          label='用户名'
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='密码'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            登录
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  )
}

export default Login
