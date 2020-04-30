import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import * as Tone from "tone";
import Form from './Form'
// const notes = [
//   'C4', 'Eb4', 'Gb2',
//   'C4', 'E3', 'A3',
//   'D2', 'A1', 'Gb3',
// ];
const newObject = {
  0:'C4',
  1:'D4'
}

const arrayOne = [
  'C4', 'Eb4', 'Gb2',
  'C4', 'E3', 'A3',
  'D2', 'A1', 'Gb3',
];
const arrayTwo = [
  'Bb3', 'G3', 'Eb3',
  'D3', 'Bb2', 'G2',
  'Eb2', 'D2', 'Bb1',
];
const arrayThree = [
  'E4', 'Eb4', 'F4',
  'C4', 'E4', 'A4',
  'D4', 'A4', 'Gb4',
];
// Givine my citySelect a default value (Toronto)
class App extends Component {
  constructor() {
    super();
    this.synth =
      new Tone.Synth({
        "oscillator": {
          "type": "sine"
        },
        "envelope": {
          "attack": 0.001,
          "decay": 0.5,
          "sustain": 0.5,
          "release": 0.5
        }
      })

    this.state = {
      citySelect: '4118',
      windSpeed: 0,
      weatherStatis:''
      //ANY OTHER WEATHER PARAMETERS AND CHANGE WITH this.setState
    }
    // console.log(this.state.citySelect);
  }
  componentDidMount() {
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
      url: 'https://proxy.hackeryou.com',
      params: {
        reqUrl: url
      }
    }).then((result) => {
      // get result from Axios call, navigate to the weather for the current day
      const weatherData = result.data.consolidated_weather[0]
      // const weatherData = result.data
      // console.log(weatherData);
      // console.log(weatherData.wind_speed);
      Tone.Transport.stop();
      this.setState({
        windSpeed: weatherData.wind_speed,
        weatherStatis: weatherData.weather_state_abbr
      });
    })
  }
  handleChange = (event, metropolis) => {
    event.preventDefault();
    console.log('hello?');
    // console.log(metropolis);
    //update the citySelect in state and make new axios call
    this.setState({
      citySelect: metropolis
    }, () => this.getWeather())
    // console.log(this.state.citySelect);
  }
  repeat = (time, index) => {
    console.log('repeat????', index);
    // let note = notes[index % notes.length];
    //Conditonal statement to assign array(song) depending on weatherStatis
    let note
      if (this.state.weatherStatis === 'hr') {
      note = arrayThree[index % arrayThree.length];
    } if (this.state.weatherStatis === 'h') {
      note = arrayTwo[index % arrayTwo.length]
    } if (this.state.weatherStatis === 'lc') {
      note = arrayOne[index % arrayOne.length]
    }
    this.synth.triggerAttackRelease(note, '8n', time)
    console.log(this.state.weatherStatis);
  }
  scheduleRepeat = () => {
    let index = 0;
    console.log(index, 'index?');
    Tone.Transport.scheduleRepeat(time => {
      //do something with the time
      this.repeat(time, index);
      index++;
    }, '8n');
  }

  startTone = () => {
    const gain = new Tone.Gain(0.1);
    const vol = new Tone.Volume({
      'volume': 1,
      'mute': false
    });
    //route to master
    this.synth.connect(vol)
    vol.connect(gain)
    gain.toMaster();

    //wind speed is setting the BPM (*10 to make sure its not too slow)
    Tone.Transport.bpm.value = (this.state.windSpeed) * 10
    Tone.Transport.start(); 
    //Not sure why this.synth.triggerAttackRelease() is called a second time?
    this.synth.triggerAttackRelease();
    this.scheduleRepeat();
  }

  stopTone = () => {
    Tone.Transport.stop();
  }

  render() {
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
