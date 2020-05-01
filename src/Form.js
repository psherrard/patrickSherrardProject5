import React, { Component } from 'react'
// import { render } from '@testing-library/react';

class Form extends Component{
    constructor(){
        super();
        this.state = {
            userChoice: ''
        }
    }
//Saving value from users choice of city and setting the state
    getFormInfo = (event) => {
        // console.log(event.target.value);
        this.setState({
            userChoice:event.target.value
        })
    }


    render(){
        return(
            <nav>
                <form action=''>
                    <select onChange={this.getFormInfo} value={this.state.userChoice} name='whichCity' id='whichCity'>
                        {/* <option value=''>Choose A City</option> */}
                        <option value=''>Choose A City</option>
                        <option value='4118' >Toronto</option>
                        <option value='565346' >Helsinki</option>
                        <option value='1532755'>Casablanca</option>
                        <option value='2458833'>New Orleans</option>
                        <option value='15015372'>Kyoto</option>
                        <option value='2351310'>Wellington</option>
                    </select>

                    <button onClick={(e) => this.props.handleChange(e, this.state.userChoice)} type="submit">Launch</button>
                </form>
            </nav>
        )
    }
}



    export default Form;