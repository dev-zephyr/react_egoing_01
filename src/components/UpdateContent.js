import React, { Component } from 'react';

class UpdateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id : this.props.data.id,
      title : this.props.data.title,
      desc : this.props.data.desc
    }
  }

  inputFormHandler(e){
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render() {
    console.log("UpdateContent render");
    return (
        <article>
          <h2>Update</h2>
          <form action="/create_process" method="post" 
                onSubmit={(e) => {
                  e.preventDefault();
                  this.props.onSubmit(
                    this.state.id,
                    this.state.title,
                    this.state.desc
                  );
                }}> 
            <input type="hidden" name="id" value={this.state.id}></input>
            <p>
              <input type="text" name="title" value={this.state.title}
                onChange={(e) => {
                  this.inputFormHandler(e);
                }}></input>
            </p>
            <p>
              <textarea name="desc" value={this.state.desc}
                onChange={(e) => {
                  this.inputFormHandler(e);
                }}></textarea>
            </p>
            <p>
              <input type="submit"></input>
            </p>

          </form>
        </article>
    );
  }
}

export default UpdateContent;