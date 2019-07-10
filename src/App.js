import React from 'react';
// import logo from './logo.svg';
import './App.css';
import RowChart from './Components/charts.js';

class App extends React.Component{

  render(){
  return (
    <div className="App">
    <h3 id="head">Hi EveryOne ! checkOut My Skill Set.</h3>
    <div className="mainPage">
      <RowChart/>
      {/* <svg width="400" height="400"></svg> */}
    </div>
    </div>
  );
}
}
export default App;
