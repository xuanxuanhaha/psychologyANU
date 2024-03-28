import React, {Component} from 'react';
import axios from "axios";

class Edit extends Component {
    // create a construct
    constructor(props){
        super(props);
        this.onChangeCategoryName =  this.onChangeCategoryName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            category_name:'',
        }
    }

    //
    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/category/edit/'+this.props.match.params.id)
            .then(response=>{
                this.setState({category_name:response.data.name});
            });

    }
    // change the state
    onChangeCategoryName(e){
        this.setState({
            category_name: e.target.value
        })
    }

    // change submit function
    onSubmit(e){
        e.preventDefault();
        const category={
            category_name: this.state.category_name
        };
        axios.put('http://127.0.0.1:8000/api/category/update/'+this.props.match.params.id, category)
            .then(res=>console.log(res.data));
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input type="text" className="form-control"
                               id="name"
                               aria-describedby="emailHelp"
                               value ={this.state.category_name}
                               onChange={this.onChangeCategoryName}
                               placeholder="Enter name"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                            anyone else.</small>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        );
    }
}

export default Edit;
