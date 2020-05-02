(this["webpackJsonpproject-5-weather-synth-app"]=this["webpackJsonpproject-5-weather-synth-app"]||[]).push([[0],{19:function(e,t,n){e.exports=n(43)},24:function(e,t,n){},25:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(16),i=n.n(r),c=(n(24),n(18)),s=n(3),l=n(4),u=n(6),h=n(5),d=(n(25),n(17)),p=n.n(d),m=n(2),v=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(){var e;return Object(s.a)(this,n),(e=t.call(this)).getFormInfo=function(t){e.setState({userChoice:t.target.value})},e.state={userChoice:""},e}return Object(l.a)(n,[{key:"render",value:function(){var e=this;return o.a.createElement("nav",null,o.a.createElement("form",{action:""},o.a.createElement("select",{onChange:this.getFormInfo,value:this.state.userChoice,name:"whichCity",id:"whichCity"},o.a.createElement("option",{value:""},"Choose A City"),o.a.createElement("option",{value:"4118"},"Toronto"),o.a.createElement("option",{value:"565346"},"Helsinki"),o.a.createElement("option",{value:"1532755"},"Casablanca"),o.a.createElement("option",{value:"2458833"},"New Orleans"),o.a.createElement("option",{value:"15015372"},"Kyoto"),o.a.createElement("option",{value:"2351310"},"Wellington")),o.a.createElement("button",{onClick:function(t){return e.props.handleChange(t,e.state.userChoice)},type:"submit"},"Launch")))}}]),n}(a.Component),y={0:"C3",1:"D3",2:"Eb3",3:"F3",4:"G3",5:"A3",6:"Bb3",7:"G2",8:"Bb2",9:"0"},g={0:"F3",1:"Eb3",2:"C3",3:"Gb2",4:"D3",5:"A3",6:"Bb2",7:"Gb2",8:"F1",9:"0"},f=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(){var e;return Object(s.a)(this,n),(e=t.call(this)).getWeather=function(){e.setState({loading:!0},(function(){var t="https://www.metaweather.com/api/location/".concat(e.state.citySelect);p()({method:"GET",url:"https://proxy.hackeryou.com",params:{reqUrl:t}}).then((function(t){var n=t.data.consolidated_weather[0];m.Transport.stop(),e.setState({windSpeed:n.wind_speed,weatherStatis:n.weather_state_abbr,windDirection:n.wind_direction,visibility:n.visibility,humidity:n.humidity,loading:!1})}))}))},e.handleChange=function(t,n){t.preventDefault(),console.log("hello?"),e.setState({citySelect:n},(function(){return e.getWeather()}))},e.repeat=function(t,n){console.log("index #",n);var a=1e11*(e.state.windDirection+e.state.visibility),o=Math.round(a).toString(),r=Object(c.a)(o).map((function(t){return"hc"===e.state.weatherStatis?g[t]:(e.state.weatherStatis,y[t])})),i=r;console.log(i);var s=r[n%r.length];e.synth.triggerAttackRelease(s,"8n",t)},e.scheduleRepeat=function(){var t=0;console.log(t,"index?"),m.Transport.scheduleRepeat((function(n){e.repeat(n,t),t++}),"8n")},e.startTone=function(){var t=e.state.humidity/100-.15;console.log(t),e.setState({melody:!0}),e.synth.volume.value=-20;var n=new m.JCReverb(t);console.log(m.JCReverb.value);var a=new m.Phaser({frequency:0,octaves:2,baseFrequency:0});e.synth.connect(a),a.connect(n),n.toMaster(),m.Transport.bpm.value=8*e.state.windSpeed,m.Transport.start(),e.synth.triggerAttackRelease(),e.scheduleRepeat()},e.stopTone=function(){m.Transport.stop(),e.setState({melody:!1})},e.onClickLandingPage=function(){e.setState({description:!1}),console.log("clicked"),console.log(e.state.description)},e.synth=new m.Synth({oscillator:{type:"sine"},envelope:{attack:.005,decay:.1,sustain:.3,release:.5}}),e.state={citySelect:"",weatherStatis:"",windSpeed:0,windDirection:0,visibility:0,humidity:0,loading:!1,melody:!1,description:!0},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){this.getWeather()}},{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement("h1",null,o.a.createElement("span",{className:"headerWordOne"},"Weather")," ",o.a.createElement("span",{className:"headerWordTwo"},"Synth")),o.a.createElement(v,{handleChange:this.handleChange}),o.a.createElement("section",null,this.state.loading?o.a.createElement("i",{className:"fas fa-spinner fa-pulse"}):o.a.createElement("div",{className:"startStop"},o.a.createElement("button",{onClick:this.state.melody?null:this.startTone,id:"startSong"},"Start"),o.a.createElement("button",{onClick:this.stopTone,id:"stopSong"},"Stop"))),o.a.createElement("footer",null,o.a.createElement("p",null,"Made with Tone.js ",o.a.createElement("span",null,"and MetaWeather"))))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(f,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[19,1,2]]]);
//# sourceMappingURL=main.5b62b4c9.chunk.js.map