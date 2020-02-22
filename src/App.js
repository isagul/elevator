import React, { useState, useEffect } from 'react';
import './App.scss';

let pressedFloors = [];
let floors = [];
let elevator;
const toggleDoorTime = 1000;
const arrivingTime = 2000;
const elevatorWaitTime = 2000;

function App() {
  const [floorInfo, setFloorInfo] = useState({ value: 6, label: '6' });
  const [elevatorDirection, setElevatorDirection] = useState('');
  const [isMoveElevator, setIsMoveElevator] = useState(false);

  useEffect(() => {
    floors = document.querySelectorAll('.floor');
    elevator = document.querySelector('.elevator');
    elevator.style.transition = `background-position ${toggleDoorTime}ms`;
  }, [])

  useEffect(() => {
    let promise = Promise.resolve();
    pressedFloors.forEach(floor => {
      promise = promise.then(async () => {
        setFloorInfo(floor);
        await closeDoorElevator(floor);
        await moveElevator(floor);
        await openDoorElevator(floor);
        let idx = pressedFloors.findIndex(item => item.value === floor.value);
        pressedFloors.splice(idx, 1);

        return new Promise(res => {
          setTimeout(res, arrivingTime);
        })
      })
    })
    /*promise.then(() => {
      setTimeout(() => {

      }, elevatorWaitTime)
    })*/
  }, [isMoveElevator])

  function elevatorButtons() {
    let floors = [
      { value: 5, label: '5' },
      { value: 6, label: '6' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 0, label: 'G' }
    ];
    return floors.map((floor, index) => {
      return (
        <div className="outer" key={index}>
          <button className="button" onClick={() => pressedButton(floor)} id={`button-${floor.value}`}>{floor.label}</button>
        </div>
      )
    })
  }

  function createFloors() {
    const floors = [6, 5, 4, 3, 2, 1];
    return floors.map((floor, index) => {
      return (
        <div key={index} className="floor" id={`floor-${floor}`}>
          <div className="home">
            <div className="room"></div>
          </div>
          <div className="home">
            <div className="room"></div>
          </div>
        </div>
      )
    })
  }

  const closeDoorElevator = () => {
    let elevator = document.getElementById('elevator');

    return new Promise(resolve => {
      elevator.classList.add('close-door');      
      
      setTimeout(() => {
        resolve(true);
      }, elevatorWaitTime)
    })

  }

  function openDoorElevator(e) {
    let elevator = document.getElementById('elevator');
    let clickedButton = document.getElementById(`button-${e.value}`);

    return new Promise(resolve => {
      elevator.classList.remove('close-door');
      clickedButton.classList.remove('active-button');
      setIsMoveElevator(false)   

      setTimeout(() => {     
        resolve(true);
      }, elevatorWaitTime)
    })
  }

  function moveElevator({value}) {
    let elevator = document.getElementById('elevator');
    elevator.style.transition = `top ${arrivingTime}ms`
    let targetFloor = document.querySelector(`#floor-${value}`)

    
    return new Promise(resolve => {
      for (let i = 0; i < floors.length; i++) {
        if (elevator.offsetTop > floors[i].offsetTop) {
          setElevatorDirection('Up')
          for (let i = elevator.offsetTop; i >= targetFloor.offsetTop; i--) {          
            elevator.style.top = i + 'px'
          }
        } else if (elevator.offsetTop < floors[i].offsetTop) {
          setElevatorDirection('Down')
          for (let i = elevator.offsetTop; i <= targetFloor.offsetTop; i++) {
            elevator.style.top = i + 'px'
          }
        }
      }
      setTimeout(() => {
        elevator.style.transition = `background-position ${toggleDoorTime}ms`;
        resolve(true);
      }, arrivingTime)
    });
  }

  function pressedButton(e) {
    let idx = pressedFloors.findIndex(item => item.value === e.value);
    if (idx === -1) {
      pressedFloors.push(e);
    }

    pressedFloors.forEach(floor => {
      let clickedButton = document.getElementById(`button-${floor.value}`);
      clickedButton.classList.add('active-button');
    })
    
    setIsMoveElevator(true);
    
  }

  return (
    <div className="app">
      <div className="elevator-buttons-area">
        <div className="floor-info-area">
          <p className="floor-info">Floor {floorInfo.label}</p>
          {
            isMoveElevator && <p className="elevator-direction-info">Direction: {elevatorDirection}</p>
          }
        </div>
        <div className="elevator-buttons">
          {elevatorButtons()}
        </div>
      </div>
      <div className="building">
        {createFloors()}
        <div className="floor" id="floor-0">
          <div className="home">
            <div className="door"></div>
            <div className="door"></div>
          </div>
        </div>
        <div className="elevator" id="elevator">
          <div className="elevator-door"></div>
          <div className="elevator-light" style={{ background: isMoveElevator ? 'red' : 'lime' }}></div>
        </div>
      </div>
      <div className="github-area">
        <a href="https://github.com/isagul/elevator" target="_blank" rel="noopener noreferrer">
          <p><i className="fab fa-github"></i>View On Github</p>
        </a>
      </div>
    </div>
  );
}

export default App;
