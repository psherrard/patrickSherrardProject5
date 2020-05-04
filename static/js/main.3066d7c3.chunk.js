(this["webpackJsonpproject-5-weather-synth-app"]=this["webpackJsonpproject-5-weather-synth-app"]||[]).push([[0],{22:function(e,t,n){e.exports=n(47)},27:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),i=n(19),l=n.n(i),r=n(21),s=n(3),c=n(4),u=n(6),h=n(5),d=(n(7),n(27),n(8),n(9),n(20)),m=n.n(d),p=n(2),g=(n(45),function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(){var e;return Object(s.a)(this,n),(e=t.call(this)).getFormInfo=function(t){e.setState({userChoice:t.target.value})},e.nullButton=function(e){e.preventDefault()},e.state={userChoice:""},e}return Object(c.a)(n,[{key:"render",value:function(){var e=this;return console.log(this.props.melodyChange),o.a.createElement("nav",null,o.a.createElement("form",{className:"formMenu",action:""},o.a.createElement("select",{onChange:this.getFormInfo,value:this.state.userChoice,name:"whichCity",id:"whichCity"},o.a.createElement("option",{value:"",disabled:!0,selected:!0},"Choose A City"),o.a.createElement("option",{value:"4118"},"Toronto"),o.a.createElement("option",{value:"565346"},"Helsinki"),o.a.createElement("option",{value:"1532755"},"Casablanca"),o.a.createElement("option",{value:"2458833"},"New Orleans"),o.a.createElement("option",{value:"15015372"},"Kyoto"),o.a.createElement("option",{value:"2351310"},"Wellington")),o.a.createElement("button",{className:"btnLaunch btnGlobal",onClick:this.props.melodyChange?this.nullButton:function(t){return e.props.handleChange(t,e.state.userChoice)},type:"submit"},"Launch")))}}]),n}(a.Component)),y=(n(46),function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(){var e;return Object(s.a)(this,n),(e=t.call(this)).onClickLandingPage=function(){e.setState({description:!1}),console.log("clicked"),console.log(e.state.description)},e.state={description:!0},e}return Object(c.a)(n,[{key:"render",value:function(){return o.a.createElement("div",null,this.state.description?o.a.createElement("div",{className:"landingPage"},o.a.createElement("h2",null,"DESCRIPTION"),o.a.createElement("p",null,"Welcome to Weather Synth. This app use\u2019s real time weather data from different cities across the world to shape sound. As the user, you get to choose what city you want to listen to. What you\u2019re listening to is varius weather parameters affecting the synth by picking which notes are played and in what scale. As well as the amount of reverb, chorus, phaser and delay. The speed of the song is determined by the wind speed and the oscillator by the weather condition. Press start to hear the end result. "),o.a.createElement("button",{className:"btnGlobal btnLandingPage",onClick:this.onClickLandingPage},"Enter")):"")}}]),n}(a.Component)),v={0:"C3",1:"D3",2:"E3",3:"F3",4:"G3",5:"A3",6:"B3",7:"G2",8:"B2",9:"0"},f={0:"C3",1:"D3",2:"Eb3",3:"F3",4:"G3",5:"A3",6:"Bb3",7:"G2",8:"Bb2",9:"0"},b=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(){var e;return Object(s.a)(this,n),(e=t.call(this)).getWeather=function(){e.setState({loading:!0},(function(){var t="https://www.metaweather.com/api/location/".concat(e.state.citySelect);m()({method:"GET",url:"https://proxy.hackeryou.com",params:{reqUrl:t}}).then((function(t){var n=t.data.consolidated_weather[0];p.Transport.stop(),e.setState({windSpeed:n.wind_speed,weatherStatis:n.weather_state_abbr,windDirection:n.wind_direction,visibility:n.visibility,humidity:n.humidity,loading:!1})}))}))},e.handleChange=function(t,n){t.preventDefault(),console.log("hello?"),e.setState({citySelect:n},(function(){return e.getWeather()}))},e.repeat=function(t,n){console.log("index #",n);var a=1e11*(e.state.windDirection+e.state.visibility),o=Math.round(a).toString(),i=Object(r.a)(o).map((function(t){return"lc"===e.state.weatherStatis?v[t]:(e.state.weatherStatis,f[t])})),l=i;console.log(l);var s=i[n%i.length];e.synth.triggerAttackRelease(s,"8n",t)},e.scheduleRepeat=function(){var t=0;console.log(t,"index?"),p.Transport.scheduleRepeat((function(n){e.repeat(n,t),t++}),"8n")},e.startTone=function(){var t=e.state.humidity/100-.08;console.log(t),e.setState({melody:!0}),e.synth.volume.value=-20;var n=new p.JCReverb(t);console.log(p.JCReverb.value);var a=new p.Phaser({frequency:0,octaves:2,baseFrequency:0});e.synth.connect(a),a.connect(n),n.toMaster(),p.Transport.bpm.value=8*e.state.windSpeed,p.Transport.start(),e.synth.triggerAttackRelease(),e.scheduleRepeat()},e.stopTone=function(){p.Transport.stop(),e.setState({melody:!1})},e.onClickLandingPage=function(){e.setState({description:!1}),console.log("clicked"),console.log(e.state.description)},e.synth=new p.Synth({oscillator:{type:"square"},envelope:{attack:.005,decay:.1,sustain:.3,release:.5}}),e.state={citySelect:"",weatherStatis:"",windSpeed:0,windDirection:0,visibility:0,humidity:0,loading:!1,melody:!1,description:!0},e}return Object(c.a)(n,[{key:"componentDidMount",value:function(){this.getWeather()}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(y,null),o.a.createElement("header",null,o.a.createElement("div",{className:"headerTitle"},o.a.createElement("h1",null,"WEATHER"),o.a.createElement("h1",null,"SYNTH")),o.a.createElement(g,{handleChange:this.handleChange,melodyChange:this.state.melody})),o.a.createElement("section",null,this.state.loading?o.a.createElement("i",{className:"fas fa-spinner fa-pulse"}):o.a.createElement("div",{className:"startStop"},o.a.createElement("button",{className:"btnGlobal btnStart",onClick:this.state.melody?null:this.startTone,id:"startSong"},"Start"),o.a.createElement("button",{className:"btnGlobal btnStop",onClick:this.stopTone,id:"stopSong"},"Stop"))),o.a.createElement("footer",null,o.a.createElement("p",null,o.a.createElement("span",null,"Built by Patr"),"ick Sherrard"),o.a.createElement("p",null,o.a.createElement("span",null,"Made with Tone.js")," and MetaWeather")))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(b,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},7:function(e,t,n){},8:function(e,t,n){},9:function(e,t,n){}},[[22,1,2]]]);
//# sourceMappingURL=main.3066d7c3.chunk.js.map