import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./page/Home";
import NavHeader from './components/NavHeader';
import Footer from './components/Footer';
import Error from "./page/Error";

import CrudGallery from "./page/crud_gallery";
import Form from "./page/crud_gallery/components/FormComponents";
import Todo from "./page/todo";
import Contact from "./page/contact/Contact";
import TiketPesawat from "./page/tiket_pesawat";

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
          <Route path="/crud-gallery" component={CrudGallery} />
          <Route path="/form" component={Form} />
          <Route path={"/form-edit/:id"} component={Form} />
          <Route path="/todo" component={Todo} />
          <Route path="/contact" component={Contact} />
          <Route path="/tiket-pesawat" component={TiketPesawat} />
          <Route component={Error} />
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
