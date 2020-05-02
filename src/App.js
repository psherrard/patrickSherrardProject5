import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import * as Tone from "tone";
import Form from './Form'
import LandingPage from './LandingPage'

// C Minor
const scaleOne = {
  0: 'C3',
  1: 'D3',
  2: 'Eb3',
  3: 'F3',
  4: 'G3',
  5: 'Ab3',
  6: 'Bb3',
  7: 'G2',
  8: 'Bb2',
  9: '0'
}

//C Dorian 
const scaleTwo = {
  0: 'C3',
  1: 'D3',
  2: 'Eb3',
  3: 'F3',
  4: 'G3',
  5: 'A3',
  6: 'Bb3',
  7: 'G2',
  8: 'Bb2',
  9: '0'
}

// Custom
const scaleThree = {
  0: 'F3',
  1: 'Eb3',
  2: 'C3',
  3: 'Gb2',
  4: 'D3',
  5: 'A3',
  6: 'Bb2',
  7: 'Gb2',
  8: 'F1',
  9: '0'
}

//Thunderstorm
const scaleThunder = {
  0: 'C3',
  1: 'Db3',
  2: 'E3',
  3: 'F2',
  4: 'Gb3',
  5: 'Ab1',
  6: 'B2',
  7: 'C2',
  8: '0',
  9: '0'
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
        "release": 0.5
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
      melody: false,
      description: true
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
    // --------------------------------------------------------------------------------------------- L O G I C -----------------------
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
      //THIS LOGIC MIGHT NEED SOME WORK...MAYBE AN ARRAY FOR EACH WEATHERSTATIS?
      if (this.state.weatherStatis === 'hr'){
        return scaleThree[newNumber]
      } if (this.state.weatherStatis === 'lc') {
        return scaleTwo[newNumber]
      } if (this.state.weatherStatis === 's'){
        return scaleOne[newNumber]
      } if (this.state.weatherStatis === 't'){
        return scaleThunder[newNumber]
      }
      console.log(newNumber);
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
    const reverbTime = (this.state.humidity / 100) - 0.15
    console.log(reverbTime);


    this.setState({
      melody:true
    })
    //All Synth add ons and FXs, then route to master output ---------------------------------------- F X ----------------------------
    this.synth.volume.value = -20;
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

  // onClickLandingPage = () => {
  //   this.setState({
  //     description:false
  //   })
  //   console.log('clicked');
  //   console.log(this.state.description);
  // }
  

  render() {
    // console.log(this.state.windDirection);
    return (
      <div className="App">
        <LandingPage />
        <h1><span className="headerWordOne">Weather</span> <span className="headerWordTwo">Synth</span></h1>

        <Form handleChange={this.handleChange} />

        <section>
          {/* Checking it loading is T/F to display loading on axios call */}
          {this.state.loading
            ? <i className="fas fa-spinner fa-pulse"></i>
            : <div className="startStop">
              <button onClick={this.state.melody ? null : this.startTone} id="startSong">Start</button>
              <button onClick={this.stopTone} id="stopSong">Stop</button>
            </div>
          }
        </section>
        <footer>
          <p>Build by Patrick Sherard</p>
          <p>Made with Tone.js <span>and MetaWeather</span></p>
        </footer>

      </div>
    );
  }
}
export default App;