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
            //STILL NEED TO ADD KEYS??
            <form action=''>
                <select onChange={this.getFormInfo} value={this.state.userChoice} name='whichCity' id='whichCity'>
                    {/* <option value=''>Choose A City</option> */}
                    <option value="4118" >Toronto</option>
                    <option value="565346" >Helsinki</option>
                </select>

                <button onClick={(e) => this.props.handleChange(e, this.state.userChoice)} type="submit">Launch</button>
            </form>
        )
    }
}



    export default Form;