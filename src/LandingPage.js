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
                            <p>This app collects real time data from different cities across the world and composes it into a soundscape that signifies the active weather system present in your selected city. Various weather parameters affect the synth by impacting which notes are played and in what scale. Similar to a wind chime, the speed of wind determines the pace of the composition.</p>
                            <ul>
                                <li>I: Choose a city</li>
                                <li>II: Launch the city</li>
                                <li>III: Press START to hear melody</li>
                                <li>IV: Press STOP to stop the melody and choose new city</li>
                            </ul>
                            <button className="btnGlobal btnLandingPage" onClick={this.onClickLandingPage}>Enter</button>
                        </div>
                    :   ''
                }
            </div>
        )
    }
}

export default LandingPage;