/// <reference types="vite/client" />
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
// import { ClerkProvider } from '@clerk/react'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import QueryProvider from './context/queryClientProvider.tsx'
import { UserContextProvider } from './context/userContextProvider.tsx'
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY!;
// // if (!PUBLISHABLE_KEY) {
// //   throw new Error("Missing Publishable Key")
// // }
createRoot(document.getElementById('root')!).render(
  <QueryProvider>
    <Provider store={store}>
      {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY}> */}
      <BrowserRouter>
            <UserContextProvider>
        <App />
        </UserContextProvider>
      </BrowserRouter>
      {/* </ClerkProvider> */}
    </Provider>
  </QueryProvider>
  ,
)
