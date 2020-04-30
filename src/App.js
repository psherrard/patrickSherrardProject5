import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import * as Tone from "tone";
import Form from './Form'

// Givine my citySelect a default value (Toronto)
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



    //update the citySelect in state and make new axios call..correct?
    this.setState({
      citySelect: metropolis
    }, () => this.getWeather())
    // console.log(this.state.citySelect);
  }

  startTone = () =>{
    Tone.Transport.start();
  }
  
  stopTone = () => {
    Tone.Transport.stop();
  }
  
  render(){
    // console.log(this.state.citySelect);
    // console.log(this.state.windSpeed);


    // Can I store synth in Function Component??
    const synth = new Tone.Synth({
      "oscillator": {
        "type": "sine"
      },
      "envelope": {
        "attack": 0.001,
        "decay": 0.5,
        "sustain": 0.5,
        "release": 5
      }
    })
    // synth.triggerAttackRelease("C3", "8n");
    // console.log(synth.envelope.release);
    const gain = new Tone.Gain(0.1);
    //route to master
    synth.connect(gain)
    gain.toMaster();

    const notes = [
      'C4', 'Eb4', 'Gb2',
      'C4', 'E3', 'A3',
      'D2', 'A1', 'Gb3',
    ];

    let index = 0;

    //repeated event every 8th note
    Tone.Transport.scheduleRepeat(time => {
      //do something with the time
      repeat(time);
    }, '8n');

    Tone.Transport.bpm.value = (this.state.windSpeed) * 10
    console.log(Tone.Transport.bpm.value);

    function repeat(time) {
      let note = notes[index % notes.length];
      // console.log(note);
      synth.triggerAttackRelease(note, '8n', time)
      index++;
    }

    // Tone.Transport.start();

    // setTimeout(() => {
    //   Tone.Transport.stop();
    // }, 9000)






    return (
      <div className="App">
        <h1>Weather Synth App</h1>
          
          <Form handleChange={this.handleChange} />

        <div>
          <button onClick={this.startTone} id="startSong">Start</button>
          <button onClick={this.stopTone} id="stopSong">Stop</button>
        </div>
      </div>
    );
  }
}

export default App;

