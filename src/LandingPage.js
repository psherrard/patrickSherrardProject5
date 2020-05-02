import React, { Component } from 'react'


class LandingPage extends Component{
    constructor(){
        super();
        this.state = {
            description:true
        }
    }

    onClickLandingPage = () => {
        this.setState({
            description: false
        })
        console.log('clicked');
        console.log(this.state.description);
    }
    render(){
        return(
            <div>
                {this.state.description
                    ?   <div className="landingPage1">
                            <h2>DESCRIPTION</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit Corrupti aperiam quasi ipsa dolore quis sint quam doloribus fugit labore iure quos maiores sit temporibus laudantium doloremque debitis molestiae commodi error.</p>
                            <button onClick={this.onClickLandingPage}>Enter</button>
                        </div>
                    :   ''
                }
            </div>
        )
    }
}

export default LandingPage;