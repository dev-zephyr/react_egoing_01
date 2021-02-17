import React, { Component } from 'react';
import './App.css';
import TOC from './components/TOC';
import Subject from './components/Subject';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Control from './components/Control';
import { render } from '@testing-library/react';


class App extends Component {
  constructor(props) {
    super(props)
    this.max_content_id = 3;
    this.state = {
      mode : 'welcome',
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

  getReadContent(){
    for(var i = 0; i<this.state.contents.length; i++) {
      if(this.state.contents[i].id === this.state.selected_content_id) {
        return this.state.contents[i];
      }
    }
  }

  getContent() {
    let _title, _desc, _article, _content = null;

    if (this.state.mode === 'welcome') {

      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>

    } else if (this.state.mode === 'read') {

      _content = this.getReadContent();
      console.log("=================" , _content);
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>

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

    } else if(this.state.mode === 'update') {

      console.log("update===========" , this.getReadContent());

      _article = <UpdateContent 
        data={this.getReadContent()}
        onSubmit={(_id, _title, _desc) => {
          
          let _contents = Array.from(this.state.contents);
          console.log("수정 전", _contents);
          
          for(let i = 0; i<_contents.length; i++) {
            if(_contents[i].id === _id) {
              _contents[i] = {
                id : _id,
                title : _title,
                desc : _desc
              }
              console.log("수정 후", _contents);
              this.setState({
                contents : _contents
              })
              break;
            }
          }
        
        }}>

      </UpdateContent>
    }
    return _article;
  }

  render() {
    
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
            if(_mode === 'delete') {
              
              if(window.confirm('삭제하시겠습니까?')) {
                
                for(let i=0; i<this.state.contents.length; i++) {
                  if(this.state.contents[i].id === this.state.selected_content_id) {
                    this.state.contents.splice(i, 1);
                    break;
                  }
                }
                this.setState({
                  mode : 'welcome'
                })
                alert('삭제 완료');
              }
            } else {
              this.setState({
                mode : _mode
              })
            }
          }.bind(this)}></Control>
        <hr />
        {this.getContent()}
      </div>
    );
  }
}

export default App;
 