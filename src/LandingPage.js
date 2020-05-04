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
                    ?   <div className="landingPage">
                            <h2>DESCRIPTION</h2>
                            <p>Welcome to Weather Synth. This app use’s real time weather data from different cities across the world to shape sound. As the user, you get to choose what city you want to listen to. What you’re listening to is varius weather parameters affecting the synth by picking which notes are played and in what scale. As well as the amount of reverb, chorus, phaser and delay. The speed of the song is determined by the wind speed and the oscillator by the weather condition. Press start to hear the end result. </p>
                            <button className="btnGlobal btnLandingPage" onClick={this.onClickLandingPage}>Enter</button>
                        </div>
                    :   ''
                }
            </div>
        )
    }
}

export default LandingPage;