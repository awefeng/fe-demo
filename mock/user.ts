import Mock from 'mockjs'

Mock.setup({ timeout: '200-1000' })
Mock.mock('/api/user/v1/info', {})
