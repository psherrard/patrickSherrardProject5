import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import * as Tone from "tone";
import Form from './Form'

//Helsinki code: 565346

class App extends Component {
  constructor() {
    super();
    this.state = {
      citySelect: '4118',
      windSpeed:0
      //ANY OTHER WEATHER PARAMETERS AND CHANGE WITH this.setState
    }
    // console.log(this.state.citySelect);
  }
  componentDidMount(){
    //call this.getWeather once the component is rendered
    //Maybe put synth on this too
    this.getWeather()
    // console.log(this.getWeather);
  }

  
  getWeather = () => {
    //last digits (4118) will need to be stored in a variable to select different cities
    const url = `https://www.metaweather.com/api/location/${this.state.citySelect}`;
    axios({
      method: 'GET',
      url:'https://proxy.hackeryou.com' ,
      params: {
        reqUrl:url
      }
    }).then((result) => {
      // get result from Axios call, navigate to the weather for the current day
      const weatherData = result.data.consolidated_weather[0]
      // const weatherData = result.data
      // console.log(weatherData);
      // console.log(weatherData.wind_speed);
      this.setState ({
        windSpeed: weatherData.wind_speed
      });
      // console.log(this.state.windSpeed);
    })
  }


  handleChange = (event, metropolis) => {
    event.preventDefault();
    // console.log(metropolis);



    //update the citySelect in state
    this.setState({
      citySelect: metropolis
    }, () => this.getWeather())
    // console.log(this.state.citySelect);
  }
  
  render(){
    console.log(this.state.citySelect);
    console.log(this.state.windSpeed);


    // Can I store synth in Function Component??
    const synth = new Tone.Synth({
      "oscillator": {
        "type": "sine"
      },
      "envelope": {
        "attack": 0.5,
        "decay": 0.5,
        "sustain": 10,
        "release": 50
      }
    })
    synth.triggerAttackRelease("C3", "8n");
    const freeverb = new Tone.Freeverb()
    freeverb.dampening.value = 650;
    // console.log(synth.envelope.release);
    const gain = new Tone.Gain(0.0);
    //route to master
    synth.connect(freeverb)
    freeverb.connect(gain)
    gain.toMaster();

    
    return (
      <div className="App">
        <h1>Weather Synth App</h1>
          
          <Form handleChange={this.handleChange} />

        <div>
          <button id="startSong">Start</button>
          <button id="stopSong">Stop</button>
        </div>
      </div>
    );
  }
}

export default App;

