import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./page/Home";
import NavHeader from './components/NavHeader';
import Footer from './components/Footer';
import Error from "./page/Error";

function App() {
  return (
    <BrowserRouter>
      <div style={{
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'block',
        position: 'relative',}}>
        <NavHeader />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route component={Error} />
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
