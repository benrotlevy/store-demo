import React from "react";
import { productsAPI } from "../../api";
import "./create.css";

export class Create extends React.Component {

    state = {name: "", price: "", description: "", image: "", isSubmit: false}

    onInputChange = (target) => {
        this.setState({[target.name]: target.value});
    }

    create = async(event) => {
        event.preventDefault();
        if(this.allInputsFull() && this.state.name.length > 4 && !this.state.isSubmit) {
            event.target.disabled= true;
            try {
                this.setState({isSubmit: true});
                const newAvatar = {...this.state};
                delete newAvatar.isSubmit;
                const {data} = await productsAPI.post("/", newAvatar);
                this.setState({isSubmit: false});
                this.props.history.push(`/product/${data.id}`);
            } catch(error) {
                console.log(error);
            }
        }
    }

    // add validation to image

    allInputsFull = () => {
        for(let key in this.state) {
            if(!this.state[key] && key !== "isSubmit") {
                return false;
            }
        }
        return true;
    }

    render() {
        return (
            <>
                {<div className="create-container">
                    <form onSubmit={this.create}>
                        <input minlength="4" name="name" placeholder="Product name" value={this.state.name} onChange={({target})=>this.onInputChange(target)} />
                        <input step="0.1" type="number" min="0.1" max="1000" name="price" placeholder="Product Price" value={this.state.price} onChange={({target})=>this.onInputChange(target)} />
                        <input minlength="20" name="description" placeholder="Product Description" value={this.state.description} onChange={({target})=>this.onInputChange(target)} />
                        <input name="image" placeholder="Product Image" value={this.state.image} type="url" onChange={({target})=>this.onInputChange(target)} />
                        <input className="create-btn" type="submit" value="Create New Product" />
                    </form>
                </div>}
            </>
        )
    }
}