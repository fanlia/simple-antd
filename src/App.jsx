import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import { ConfigProvider, App as AntdApp } from 'antd'
import { locale, routes } from './config'

function App() {
  const router = createBrowserRouter(routes)
  return (
    <ConfigProvider locale={locale}>
      <AntdApp>
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
