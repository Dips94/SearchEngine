//-*- mode: rjsx-mode;

'use strict';

const React = require('react');

class Search extends React.Component {

  /** called with properties:
   *  app: An instance of the overall app.  Note that props.app.ws
   *       will return an instance of the web services wrapper and
   *       props.app.setContentName(name) will set name of document
   *       in content tab to name and switch to content tab.
   */
  constructor(props) {
    super(props);
this.state = {value: ""};
this.onChange = this.onChange.bind(this);
this.onBlur = this.onBlur.bind(this);
this.onSubmit = this.onSubmit.bind(this);
  }
setFormErrors(errors) { this.setState({formErrors: errors}); }
  //@TODO
onChange(event){
    const target = event.target;
    const name = target.name;
    const value = target.value || '';
    this.setState({value: value})
}
async onBlur(event){
try{
const q = this.state.value;
const results = await this.props.app.ws.searchDocs(q);
console.log(results);
if(results.totalCount === 0){
const msg = "no results for "+q;
this.setFormErrors([msg]);
}
}catch(err){
const msg = (err.message) ? err.message : 'web service error';
this.setFormErrors([msg])
}
}

async onSubmit(event){

}

  render() {
    const value = this.state.value;
return (<div><form onSubmit = {this.onSubmit}><label><span className="label">Search Terms:</span><span className="control"><input type ="text" id="q" name="q" value={value} onBlur = {this.onBlur} onChange = {this.onChange}/><br/></span></label></form><span className="error">{this.state.formErrors}</span></div>);
  }

}

module.exports = Search;
