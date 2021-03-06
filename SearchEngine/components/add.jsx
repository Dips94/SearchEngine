//-*- mode: rjsx-mode;

'use strict';

const React = require('react');

class Add extends React.Component {

  /** called with properties:
   *  app: An instance of the overall app.  Note that props.app.ws
   *       will return an instance of the web services wrapper and
   *       props.app.setContentName(name) will set name of document
   *       in content tab to name and switch to content tab.
   */
  constructor(props) {
    super(props);
	this.onChange = this.onChange.bind(this);
	this.state = {};
  }

  //@TODO add code

  //Note that a you can get information on the file being uploaded by
  //hooking the change event on <input type="file">.  It will have
  //event.target.files[0] set to an object containing information
  //corresponding to the uploaded file.  You can get the contents
  //of the file by calling the provided readFile() function passing
  //this object as the argument.

 setFormErrors(errors) { this.setState({formErrors: errors}); }

	async onChange(event){
	
try{
		const target = event.target.files[0];
		//console.log(target);
		let name = target.name;
		//console.log(name);
		name = name.substring(0,name.indexOf('.'));
		const fileContent = await readFile(target);
		//console.log(fileContent);
		await this.props.app.ws.addContent(name,fileContent);
 		this.props.app.setContentName(name);
}catch(err){
const msg = (err.message) ? err.message : 'web service error';
      this.setFormErrors([msg])
}
	}

  render() {
	const error = this.state.formErrors;
    return (<form><label className="label">Choose File:<input className="control" type="file" onChange={this.onChange}/></label><div className="error">{error}</div></form>);
  }

}

module.exports = Add;

/** Return contents of file (of type File) read from user's computer.
 *  The file argument is a file object corresponding to a <input
 *  type="file"/>
 */
async function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>  resolve(reader.result);
    reader.readAsText(file);
  });
}
