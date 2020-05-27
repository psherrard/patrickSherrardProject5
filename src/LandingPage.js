import React, { Component } from 'react';
// import './partials/Setup.scss'
// import './partials/Button.scss';
// import './partials/LandingPage.scss';
// import './partials/MediaQuery.scss';


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
    }
    render(){
        return(
            <div>
                {this.state.description
                    ?   <div className="landingPage">
                            <h2>DESCRIPTION</h2>
                            <p>This app collects real time data from different cities across the world and composes it into a soundscape that signifies the active weather system present in your selected city. Various weather parameters affect the synth by impacting which notes are played and in what scale, as well as the amount of reverb, chorus, phaser and delay. Similar to a wind chime, the speed of wind determines the pace of the composition. The oscillator's variations in waveform are subject to the condensation of cloud formations and precipitation from rain or snow within the chosen atmosphere.</p>
                            <button className="btnGlobal btnLandingPage" onClick={this.onClickLandingPage}>Enter</button>
                        </div>
                    :   ''
                }
            </div>
        )
    }
}

export default LandingPage;