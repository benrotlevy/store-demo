import React from "react";
import { productsAPI } from "../../api";
import "./product.css";

export class Product extends React.Component {

    state = {product: this.props.location.product, nameInput: ""}

    async componentDidMount() {
        if(!this.state.product) {
            try {
                const {data} = await productsAPI.get(`/${this.props.match.params.id}`);
                this.setState({product : {...data}});
            } catch (error) {
                console.log(error);
            }
            
        }
    }

    update = async () => {
        try {
            const newProduct = {...this.state.product, name: this.state.nameInput}
            const {data} = await productsAPI.put(`/${this.props.match.params.id}`, newProduct);
            this.setState({product : {...data}, nameInput: ""});
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <main>
                {this.state.product && 
                    <><div>
                        <h1>{this.state.product.name}</h1>
                        <h2>{this.state.product.price}$</h2>
                        <img className="large-img" src={this.state.product.image} />
                        <p>{this.state.product.description}</p>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <input placeholder="Update Name" value={this.state.nameInput} onChange={({target})=>this.setState({nameInput: target.value})}/>
                        <button className="update-btn" onClick={this.update} >Update name</button>
                    </div></>  
                }
            </main>
        )
    }
}