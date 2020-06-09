import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import * as Tone from "tone";
import Form from './Form';
import LandingPage from './LandingPage';

// C Major
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

//Custom
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

//Lydian
const scaleFour = {
  0: 'C3',
  1: 'D3',
  2: 'E3',
  3: 'F#3',
  4: 'G3',
  5: 'A3',
  6: 'B3',
  7: 'C2',
  8: 'F#2',
  9: '0'
}

// Hirajōshi
const scaleFive = {
  0: 'C3',
  1: 'Db3',
  2: 'F3',
  3: 'Gb3',
  4: 'Bb3',
  5: 'C4',
  6: 'Bb2',
  7: 'Gb2',
  8: 'Db4',
  9: '0'
}

class App extends Component {
  constructor() {
    super();
    this.synth =
      new Tone.Synth({
        "oscillator": {
          "type": "triangle"
        },
        "envelope": {
          "attack": 0.005,
          "decay": 0.1,
          "sustain": 0.3,
          "release": 0.5
        }
      })

    this.state = {
      citySelect: '',
      cityName: '',
      weatherStatis: '',
      weatherName: '',
      windSpeed: 0,
      windDirection: 0,
      visibility: 0,
      humidity: 0,
      loading: false,
      melody: false,
      description: true,
    }

  }

  getWeather = () => {
    this.setState({
      loading: true
    }, () => {
      const url = `https://www.metaweather.com/api/location/${this.state.citySelect}`;
      console.log(url);
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
        console.log(weatherData.wind_direction);
        this.setState({
          cityName: result.data.title,
          windSpeed: weatherData.wind_speed,
          weatherStatis: weatherData.weather_state_abbr,
          weatherName: weatherData.weather_state_name,
          windDirection: weatherData.wind_direction,
          visibility: weatherData.visibility,
          humidity: weatherData.humidity,
          loading: false,
        });
      }).catch(() => {
        alert( "Please Pick A City")
        window.location.reload();
      })
    })
  }

  handleChange = (event, metropolis) => {
    event.preventDefault();
    //update the citySelect in state and make new axios call
    this.setState({
      citySelect: metropolis
    }, () => this.getWeather())
  }


  repeat = (time, index) => {
    // Notes playing equation
    // I've taken wind direction and added visibility to diversify the note array, then times it to move the decimal
    const windD = (this.state.windDirection + this.state.visibility) * 100000000000
    const newVis = Math.round(windD)
    const numString = newVis.toString();
    const numNotes = [...numString]
    const newArray = numNotes.map((newNumber) => {
      if (this.state.weatherStatis === 'lc' || this.state.weatherStatis === 'hc') {
        return scaleOne[newNumber]
      } if (this.state.weatherStatis === 'lr') {
        return scaleTwo[newNumber]
      } if (this.state.weatherStatis === 's') {
        return scaleThree[newNumber]
      } if (this.state.weatherStatis === 'c') {
        return scaleFour[newNumber]
      } if (this.state.weatherStatis === 'hr') {
        return scaleFive[newNumber]
      }
    });
    let note = newArray[index % newArray.length];
    this.synth.triggerAttackRelease(note, '8n', time)
  }


  scheduleRepeat = () => {
    let index = 0;
    Tone.Transport.scheduleRepeat(time => {
      this.repeat(time, index);
      index++;
    }, '8n');
  }


  startTone = () => {
    this.setState({
      melody: true
    })
    // Currently all FXs are offline
    this.synth.toMaster();

    //wind speed is setting the BPM (* 10 to make sure its not too slow)
    Tone.Transport.bpm.value = (this.state.windSpeed) * 10
    Tone.Transport.start();
    this.synth.triggerAttackRelease();
    this.scheduleRepeat();
  }

  stopTone = () => {
    Tone.Transport.stop();
    this.setState({
      melody: false
    })
  }

  onClickLandingPage = () => {
    this.setState({
      description: false

    })
  }

  render() {
    return (
      <div className="zeus">
        <LandingPage />
        {/* clearBG animation currently being worked on */}
        {this.state.weatherStatis === 'hr' || this.state.weatherStatis === 's' || this.state.weatherStatis === 'lr'
          ? <div className="cloudBG">
            <div className="rain"></div>
          </div>
          : <div className="clearBG"></div>
        }
        {this.state.weatherStatis === 'lc' || this.state.weatherStatis === 'hc'
          ? <div className="cloudBG"></div>
          : <div className="clearBG"></div>
        }
        <header>
          <div className="headerTitle">
            <h1>WEATHER SYNTH</h1>
          </div>
        </header>
        <img src={require('./assets/skyline.png')} alt="" />
        <section className="controlPanel">
          {/* Checking it loading is T/F to display loading on axios call */}
          {/* I couldn't figure out the logic to make the spinner not appear when the page first loaded. I know I'm getting a 400 error because my axios call doesnt have a proper end point. I tried to make a condistional setState, but I ended up breaking everything. */}
          {this.state.loading
            ? <i className="fas fa-spinner fa-pulse"></i>
            : <div>
              <div>
                <Form handleChange={this.handleChange} melodyChange={this.state.melody} />
                
                  {this.state.citySelect.length === 0 
                  ? <div className="startStop">
                      <button className="btnGlobal btnStart">Start</button>
                      <button className="btnGlobal btnStop">Stop</button>
                    </div>
                  : <div className="startStop">
                      <button className="btnGlobal btnStart" onClick={this.state.melody ? null : this.startTone} id="startSong">Start</button>
                      <button className="btnGlobal btnStop" onClick={this.stopTone} id="stopSong">Stop</button>
                   </div>
                  }
              </div>
              <div>
                <p>City : {this.state.cityName}</p>
                <p>Wind Speed : {Math.round((this.state.windSpeed * 1.60934) * 100) / 100} km/h</p>
                <p>Weather Condition : {this.state.weatherName}</p>
              </div>
            </div>}
        </section>
        <footer>
          <p>Built by Patrick Sherrard</p>
          <p>Made with Tone.js and MetaWeather</p>
        </footer>
      </div>
    );
  }
}
export default App;