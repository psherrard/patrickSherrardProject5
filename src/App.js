import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import * as Tone from "tone";
import Form from './Form'

//Global object
// const newObject = {
//   0: 'C3',
//   1: 'D3',
//   2: 'E3',
//   3: 'F3',
//   4: 'G3',
//   5: 'A3',
//   6: 'B3',
//   7: 'G2',
//   8: 'B2',
//   9: 'A2'
// }

const scaleOne = {
  0: 'C3',
  1: 'D3',
  2: 'E3',
  3: 'F3',
  4: 'G3',
  5: 'A3',
  6: 'B3',
  7: 'G2',
  8: 'B2',
  9: 'A2'
}

const scaleTwo = {
  0: 'C3',
  1: 'Eb3',
  2: 'F3',
  3: 'Gb3',
  4: 'G3',
  5: 'Bb3',
  6: 'C4',
  7: 'Gb2',
  8: 'Bb2',
  9: 'Eb2'
}

class App extends Component {
  constructor() {
    super();
    this.synth =
    new Tone.Synth({
      "oscillator": {
        "type": "sine"
      },
      "envelope": {
        "attack": 0.005,
        "decay": 0.1,
        "sustain": 0.3,
        "release": 1
      }
    })
    
    // citySelect a default value (Toronto)
    this.state = {
      citySelect: '',
      weatherStatis:'',
      windSpeed: 0,
      windDirection:0,
      visibility:0,
      humidity:0,
      loading:false,
      melody: false
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
    this.setState({
      loading:true
    },() => {
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
        Tone.Transport.stop();
        this.setState({
          windSpeed: weatherData.wind_speed,
          weatherStatis: weatherData.weather_state_abbr,
          windDirection: weatherData.wind_direction,
          visibility: weatherData.visibility,
          humidity: weatherData.humidity,
          loading:false
        });
      })
    })
    //last digits (4118) will need to be stored in a variable to select different cities
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
    console.log('index #', index);
    // let note = notes[index % notes.length];
    // Notes playing equation
    // I've taken wind direction and added visibility to diversify the note array, then times it to move the decimal
    const windD = (this.state.windDirection + this.state.visibility) * 100000000000
    // console.log(windD);
    const newVis = Math.round(windD)
    const numString = newVis.toString();
    const numNotes = [...numString]
    const newArray = numNotes.map((newNumber) => {
      // if (this.state.x === x){
      //   return
      // }
      return newObject[newNumber]
    });
    // console.log(newArray);

    const arrayOne = newArray
    console.log(arrayOne);
    let note = newArray[index % newArray.length];
    this.synth.triggerAttackRelease(note, '8n', time)
    // console.log(this.state.weatherStatis);
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
    // Reverb equation
    const reverbTime = (this.state.humidity / 100) - 0.25
    console.log(reverbTime);


    this.setState({
      melody:true
    })
    //All Synth add ons and FXs, then route to master output ---------------------------------------------------------------------
    this.synth.volume.value = -12;
    // this.synth.portamento = '0.05';
    const reverb = new Tone.JCReverb (reverbTime);
    console.log(Tone.JCReverb.value);
    const phaser = new Tone.Phaser({
      "frequency": 0,
      "octaves": 2,
      "baseFrequency": 0
    })
    this.synth.connect(phaser)
    phaser.connect(reverb)
    reverb.toMaster();

    //wind speed is setting the BPM (*8 to make sure its not too slow)
    Tone.Transport.bpm.value = (this.state.windSpeed) * 8
    // console.log(Tone.Transport.bpm.value);
    Tone.Transport.start(); 
    //Not sure why this.synth.triggerAttackRelease() is called a second time?
    this.synth.triggerAttackRelease();
    this.scheduleRepeat();
  }

  stopTone = () => {
    Tone.Transport.stop();
    this.setState({
      melody:false
    })
  }

  render() {
    // console.log(this.state.windDirection);
    return (
      <div className="App">
        <h1>Weather <span>Synth App</span> </h1>


        <Form handleChange={this.handleChange} />
        <section>
          {/* Checking it loading is T/F to display loading on axios call */}
          {this.state.loading
            ? <p className="loading"><i className="fas fa-spinner fa-pulse"></i></p>
          : <div className="startStop">
              <button onClick={this.state.melody ? null : this.startTone} id="startSong">Start</button>
              <button onClick={this.stopTone} id="stopSong">Stop</button>
            </div>
          }
        </section>
        <footer>
          <p>Made with Tone.js <span>and MetaWeather</span></p>
        </footer>

      </div>
    );
  }
}
export default App;
