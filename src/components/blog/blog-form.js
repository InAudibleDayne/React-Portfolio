import React, { Component } from 'react';
import axios from "axios";

export default class BlogForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            blog_status: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    buildForm() {
        let formData = new FormData();

        formData.append("portfolio_blog[title]", this.state.title);
        formData.append("portfolio_blog[blog_status]", this.state.blog_status);

        return formData;
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        axios.post(
                "https://daynebechtold.devcamp.space/portfolio/portfolio_blogs", 
                this.buildForm(), 
                { withCredentials: true }
            ).then(response => {
                this.props.handleSuccessfulFormSubmission(response.data.portfolio_blog);

                this.setState({
                    title: "",
                    blog_status: ""
                });
            }).catch(error => {
                console.log("handleSubmit for blog error", error);
            })


        this.props.handleSuccessfulFormSubmission(this.state);
        event.preventDefault();
    }

  render() {
    return (
        <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
        <div className="two-column">
            <input 
            onChange={this.handleChange} 
            type="text"
            name="title"
            placeholder="Blog Title"
            value={this.state.title}
            />
            <input 
            onChange={this.handleChange} 
            type="text"
            name="blog_status"
            placeholder="Blog Status"
            value={this.state.blog_status}
            />
        </div>

            <button className="btn">Save</button>
        </form>
    );
  }
}