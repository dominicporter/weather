import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe( "splitIntoDays", () =>{
    let app;
    beforeEach(() =>{
        app = new App([]);
    });

    it("returns an array", () =>{
        let days = app.splitIntoDays([]);

        expect(Array.isArray(days)).toBe(true);
    });

    it("returns an array of arrays when given at least one value", () =>{
        // should return [[1]]
        let days = app.splitIntoDays([{dt:1486933200}]);

        expect(Array.isArray(days[0])).toBe(true);
        expect(days[0][0].dt).toBe(1486933200);
    });

    it("when given chunks on multiple days splits them", () =>{
        // should return [[1]]
        let days = app.splitIntoDays([{dt:1486933200},{dt:1486944000}]);

        expect(days.length).toBe(2);
        expect(days[0].length).toBe(1);
        expect(days[1].length).toBe(1);
    });

    it("when given chunks on the same day joins them", () =>{
        // should return [[1]]
        let days = app.splitIntoDays([{dt:1486944000},{dt:1486954800}]);
        expect(days.length).toBe(1);
        expect(days[0].length).toBe(2);
    });
});

describe("getDate", () =>{
    let app;
    beforeEach(() =>{
        app = new App([]);
    });

    it("gets a valid Date from a chunk", () =>{
        let date = app.getChunkDate({dt:1486944000});

        expect(typeof date).toBe('number');
    });
});