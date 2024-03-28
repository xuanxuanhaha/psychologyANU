import React, {Component} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Pagination from "react-js-pagination";

class Listing extends Component {

    constructor(props){
        super(props);
        this.state=
            {
                categories:[],
                activePage:1,
                itemsCountPerPage:1,
                totalItemsCount:1,
                pageRangeDisplayed:3
            };

    }
    //
    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/category')
            .then(response=>{
                this.setState({
                    categories:response.data.data,
                    activePage:response.data.current_page,
                    itemsCountPerPage:response.data.per_page,
                    totalItemsCount:response.data.total
                });
            });

    }
    //
    onDelete(category_id){
        axios.delete('http://127.0.0.1:8000/api/category/delete/'+category_id)
            .then(response=>{
                const categories = this.state.categories;
                for (let i = 0; i<categories.length;i++){
                    if (categories[i].id===category_id){
                        categories.splice(i,1);
                        this.setState({
                            categories:categories
                        })
                    }


                }

            });
    }

    //
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        axios.get('http://127.0.0.1:8000/api/category?page='+pageNumber)
            .then(response=>{
                this.setState({
                    categories:response.data.data,
                    activePage:response.data.current_page,
                    itemsCountPerPage:response.data.per_page,
                    totalItemsCount:response.data.total
                });
            });

    }
    // show the html page
    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Created at</th>
                        <th scope="col">Updated at</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* list all the categories*/}
                    {
                        this.state.categories.map(category=>{
                            return (
                                <tr key={category.id}>
                                    <th scope="row">1</th>
                                    <td>{category.name}</td>
                                    <td>{category.active==='1'?("active"):("inactive")}</td>
                                    <td>{category.created_at}</td>
                                    <td>{category.updated_at}</td>
                                    <td>
                                        <Link to={`/category/edit/${category.id}`}>Edit</Link>
                                        <a href='#' onClick={this.onDelete.bind(this,category.id)}> Delete</a></td>
                                </tr>

                            )
                        })
                    }

                    </tbody>
                </table>

                <div className='d-flex justify-content-center'>
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={this.state.pageRangeDisplayed}
                        onChange={this.handlePageChange.bind(this)}
                        itemClass='page.item'
                        linkClass='page-link'

                    />
                </div>
            </div>
        );
    }
}

export default Listing;
