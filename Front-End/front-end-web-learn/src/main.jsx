import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/index.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import ScrollToTop from './config/ScrollToTop.jsx'

import "./index.css"


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <ScrollToTop/>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
