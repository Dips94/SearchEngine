//-*- mode: rjsx-mode;

'use strict';

const React = require('react');

class Content extends React.Component {

  /** called with properties:
   *  app: An instance of the overall app.  Note that props.app.ws
   *       will return an instance of the web services wrapper and
   *       props.app.setContentName(name) will set name of document
   *       in content tab to name and switch to content tab.
   *  name:Name of document to be displayed.
   */
  constructor(props) {	
    super(props);
   this.name = props.name;
//console.log(props.app.ws);
    this.state = {name: this.name}
  }
	
  //@TODO
async componentDidMount()
{
const content  = await this.props.app.ws.getContent(this.state.name);
this.setState({content: content.content});
}

async componentDidUpdate(prevProps){
if(this.props.name != prevProps.name){
const content = await this.props.app.ws.getContent(this.props.name); ;
this.setState({name: this.props.name, content: content.content})
}

}
  render() {
    const name = this.state.name;
    const content = this.state.content;
    return <section><h1>{name}</h1><pre>
{content}
</pre></section>;
  }
}

module.exports = Content;
