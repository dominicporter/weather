import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';

const Day = ({day}) => {
    return (<li>{day.text}</li>);
};

const WeatherList = ({days}) => {
    const daysNode = days.map((day) => {
        return (<Day day={day} key={day.id}/>)
    });
    return (<ul>{daysNode}</ul>);
};


window.id=0;

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };

        $.get( "http://api.openweathermap.org/data/2.5/forecast?q=edinburgh,uk&appid=14b4fdb35f2b5da649c374baf80d5196&units=metric", ( data ) => {
            console.log(data);
            data.list.forEach((dayData)=>{this.addDay(new Date(dayData.dt*1000)+
                dayData.weather[0].description)});
        });
    }

    addDay(val) {
        // Assemble data
        const weather = {text: val, id: window.id++}
        // Update data
        this.state.data.push(weather);
        // Update state
        this.setState({data: this.state.data});
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Weather in Edinburgh</h2>
                </div>
                <WeatherList
                    days={this.state.data}
                />
            </div>
        );
    }
}

export default App;
