import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import  store  from './redux/store.jsx'
import {} from './pages/index.js'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Provider store={store}>
     {/* <RouterProvider router={router}/> */} <App/>
     </Provider>
  </React.StrictMode>,
)
