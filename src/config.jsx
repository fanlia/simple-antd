
import zhCN from 'antd/locale/zh_CN'

export const locale = zhCN

import Layout from './Layout'
import ErrorBoundary from './ErrorBoundary'

import Home from './pages/Home.jsx'

export const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]

export { default as logo } from '/logo.svg'
export const title = 'Github'
export const subTitle = '全球最大的代码托管平台'

export const menu = {
  theme: 'light',
  mode: 'inline',
  defaultSelectedKeys: ['1'],
  items: [
    {
      key: '1',
      label: 'nav 1',
    },
    {
      key: '2',
      label: 'nav 2',
    },
    {
      key: '3',
      label: 'nav 3',
    },
  ],
}
