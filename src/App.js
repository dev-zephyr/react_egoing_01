import React, { Component } from 'react';
import './App.css';
import TOC from './components/TOC';
import Subject from './components/Subject';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import Control from './components/Control';
import { render } from '@testing-library/react';


class App extends Component {
  constructor(props) {
    super(props)
    this.max_content_id = 3;
    this.state = {
      mode : 'read',
      selected_content_id : 2,
      welcome : {title : 'Welcome', desc : 'Hello, React!!'},
      subject : {title : 'WEB', sub : 'world wide WEB!'},
      contents : [
        {id : 1, title : 'HTML', desc : 'HTML is HyperText..'},
        {id : 2, title : 'CSS', desc : 'CSS is for design..'},
        {id : 3, title : 'JavaScript', desc : 'Javascript is for interactive..'}
      ]
    }
  }
  render() {
    let _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'read') {
      for(var i = 0; i<this.state.contents.length; i++) {
        if(this.state.contents[i].id === this.state.selected_content_id) {
          _title = this.state.contents[i].title;
          _desc = this.state.contents[i].desc;
        }
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'create') {
      _article = <CreateContent onSubmit={(_title, _desc) => {
        let _contents = this.state.contents.concat({
          id : ++this.max_content_id,
          title : _title,
          desc : _desc
        })
        this.setState({
          contents : _contents
        })
        
      }}></CreateContent>
    }
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({
              mode : 'welcome'
            });
          }.bind(this)}>
        </Subject>

        {/* <header>
            <h1><a href="/" onClick={function(e) {
              console.log(e);
              e.preventDefault();
              // this.state.mode = 'welcome';
              this.setState({
                mode : 'welcome'
              });
            }.bind(this)}>{this.state.subject.title}</a></h1>
            {this.state.subject.sub}
        </header> */}

        <hr />
        <TOC 
          onChangePage={function(id){
            this.setState({
              mode : 'read',
              selected_content_id : Number(id)
            })
          }.bind(this)} 
          data={this.state.contents}>
        </TOC>
        <hr />
        <Control
          onChangeMode={function(_mode){
            this.setState({
              mode : _mode
            })
          }.bind(this)}></Control>
        <hr />
        {_article}
      </div>
    );
  }
}

export default App;
 