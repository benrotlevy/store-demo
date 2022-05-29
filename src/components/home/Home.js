import React from "react";
import { Link } from "react-router-dom";
import { productsAPI } from "../../api";
import "./home.css";

export class Home extends React.Component {

    state = {products: []};
    // add spinner

    async componentDidMount() {
        try {
            const {data} = await productsAPI.get("/");
            this.setState({products: [...data]});
        } catch(error) {
            console.log(error);
        }
    }

    delete = async (id) => {
        try {
            const {data} = await productsAPI.delete(`/${id}`);
            const newProducts = this.state.products.filter(product => product.id !== data.id);
            this.setState({products: newProducts});
        } catch(error) {
            console.log(error);
        }
    }

    insertProducts = () => {
        return this.state.products.map(product => {
            return (
                <div className="product-box" key={product.id}><Link to={{pathname:`/product/${product.id}`, product: product}}>
                    <div>
                        <h3>{product.name}</h3> 
                        <h4>{product.price}$</h4> 
                        <img className="small-image" src={product.image}/> 
                    </div>
                </Link>
                <button className="delete-btn" onClick={()=> this.delete(product.id)}>Delete</button></div>
            )
        })
    }

    render() {
        return (
            <div className="products-container" style={{}}>
                {this.insertProducts()}
            </div>
        )
    }
}