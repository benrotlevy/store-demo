import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Header } from './components/header/Header';
import { Product } from './components/product/Product';
import { Create } from './components/create/Create';
import { Home } from './components/home/Home';

function App() {
  return (
    <>
        <BrowserRouter>
            <Header/>
            <Route exact path={"/"}><Home/></Route>
            <Route exact path={"/product/:id"} component={Product}/>
            <Route exact path={"/create"} component={Create}/> 
        </BrowserRouter>
    </>
)
}

export default App;
