import React from 'react';
import { Provider } from 'react-redux';
import styles from './App.module.scss'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import publicRoutes from './routes/publicRoutes';
import privateRoutes from './routes/privateRoutes';
import DefaultLayout from './component/Layout/DefaultLayout/Layout';
import UserLayout from './component/Layout/UserLayout/userlayout'
import store from './app/store'


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className={styles.App}>
          <Routes>
            {publicRoutes.map((route, index) => {
            const Layout = route.layout || DefaultLayout;
            const Page = route.component;
            return (<Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>}
            />)
          })}
          </Routes>
          <Routes>
            {privateRoutes.map((route, index) => {
              const LayoutUser = route.layout || UserLayout;
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                <LayoutUser>
                  <Page />
                </LayoutUser>
                   }
              />)
             })}
          </Routes>
          </div>
        </Router> 
      </Provider>
  )
}

export default App;
