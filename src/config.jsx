
import zhCN from 'antd/locale/zh_CN'

export const locale = zhCN

import Layout from './Layout'
import ErrorBoundary from './ErrorBoundary'

import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Test from './pages/Test.jsx'

export const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/test',
        element: <Test />,
      },
    ],
  },
]

export { default as logo } from '/logo.svg'
export const title = 'Github'
export const subTitle = '全球最大的代码托管平台'

export const menu = {
  items: [
    {
      key: '/',
      label: '数据',
    },
    // {
    //   key: '/about',
    //   label: 'About',
    // },
    {
      key: '/test',
      label: '站点',
    },
  ],
}
