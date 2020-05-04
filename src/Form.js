import React, { Component } from 'react';
import './Setup.css'
import './Button.css';
import './Form.css';
import './MediaQuery.css';

class Form extends Component {
    constructor() {
        super();
        this.state = {
            userChoice: ''
        }
    }
    //Saving value from users choice of city and setting the state
    getFormInfo = (event) => {
        this.setState({
            userChoice: event.target.value
        })
    }

    nullButton = (event) => {
        event.preventDefault()
    }

    render() {
        return (
            <nav>
                <form className="formMenu" action=''>
                    <select onChange={this.getFormInfo} value={this.state.userChoice} name='whichCity' id='whichCity'>
{/* disabled selected is giving me a warning, but it's achieving what I need. */}
                        <option value='' disabled selected>Choose A City</option>
                        <option value='4118' >Toronto</option>
                        <option value='565346' >Helsinki</option>
                        <option value='1532755'>Casablanca</option>
                        <option value='2458833'>New Orleans</option>
                        <option value='15015372'>Kyoto</option>
                        <option value='2351310'>Wellington</option>
                    </select>
                    <button className="btnLaunch btnGlobal" onClick={this.props.melodyChange ? this.nullButton : (e) => this.props.handleChange(e, this.state.userChoice)} type="submit">Launch</button>
                </form>
            </nav>
        )
    }
}



export default Form;