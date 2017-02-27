import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';

const Chunk = ({chunk}) => {
    let iconUrl = "http://openweathermap.org/img/w/"+chunk.icon+".png";
    return (<div className="Chunk"><span className="time">{chunk.time}</span> {chunk.text} <img src={iconUrl}/></div>);
};

const Day = ({day}) => {
    const chunksNode = day.chunks.map((chunk) => {
        return (<Chunk chunk = {chunk} key={chunk.id}/>)
    });
    return (<div className="DayNode">{day.date}{chunksNode}</div>);
};

const WeatherList = ({days}) => {
    const daysNode = days.map((day) => {
        return (<Day day={day} key={day.id}/>)
    });
    return (<div className="WeatherList">{daysNode}</div>);
};

window.id=0;

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };

        $.get( "/weather", ( data ) => {
            console.log(data);
            this.extractData(data);
        });
    }

    extractData(data) {
        let dayList = this.splitIntoDays(data.list);
        dayList.forEach((dayData)=> {
            // this.addDay([new Date(dayData[0].dt * 1000).toDateString() + " - " +
            //     dayData[0].weather[0].description])
            this.addDay(dayData);
        });
    }

    splitIntoDays(dayChunks) {
        let days = [];
        if (dayChunks.length > 0) {
            let currentDayChunks = [];
            let currentDate = this.getChunkDate(dayChunks[0]);
            dayChunks.forEach((chunk) => {
                let chunkDate = this.getChunkDate(chunk);
                if (chunkDate == currentDate) {
                    currentDayChunks.push(chunk);
                }
                else {
                    days.push(currentDayChunks);
                    currentDayChunks = [chunk];
                    currentDate = chunkDate;
                }
            });
            days.push(currentDayChunks);
        }
        return days;
    }

    getChunkDate(chunk) {
        return (new Date(chunk.dt*1000).getDate());
    }

    addDay(dayChunks) {
        if (dayChunks.length >0) {
            let firstDate = new Date(dayChunks[0].dt * 1000).toDateString();
            let weather = {date: firstDate, chunks: [], id: window.id++}
            // Assemble data
            dayChunks.forEach((chunk) => {
                weather.chunks.push( {
                    time: new Date(chunk.dt*1000).toTimeString(),
                    text: chunk.weather[0].description,
                    icon: chunk.weather[0].icon,
                    id:window.id++} );
            });
            // Update data
            this.state.data.push(weather);
            // Update state
            this.setState({data: this.state.data});
        }

        console.log(this.state.data);
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
