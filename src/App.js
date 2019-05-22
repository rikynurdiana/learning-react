import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./page/Home";
import NavHeader from './components/NavHeader';
import Footer from './components/Footer';
import Error from "./page/Error";

import Todo from "./page/todo";
import Contact from "./page/contact/Contact";
import TiketPesawat from "./page/tiket_pesawat";
import CrudBiodata from "./page/crud_biodata"
import FormCreateCrudBiodata from "./page/crud_biodata/components/Form"
import CrudGallery from "./page/crud_gallery";
import FormCreateCrudGallery from "./page/crud_gallery/components/Form";

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
          <Route path="/contact" component={Contact} />
          <Route path="/todo" component={Todo} />
          <Route path="/crud-biodata" component={CrudBiodata} />
          <Route path="/form-create-crud-biodata" component={FormCreateCrudBiodata} />
          <Route path="/form-edit-crud-biodata/:id" component={FormCreateCrudBiodata} />
          <Route path="/crud-gallery" component={CrudGallery} />
          <Route path="/form-create-crud-gallery" component={FormCreateCrudGallery} />
          <Route path="/form-edit-crud-gallery/:id" component={FormCreateCrudGallery} />
          <Route path="/tiket-pesawat" component={TiketPesawat} />
          <Route component={Error} />
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
