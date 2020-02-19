import React, { useState } from 'react';
import './App.scss';

let pressedFloors = [];

function App() {
  const [floorInfo, setFloorInfo] = useState({ value: 6, label: '6' });
  const [elevatorDirection, setElevatorDirection] = useState('');
  const [isMoveElevator, setIsMoveElevator] = useState(false);

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

  const closeDoorElevator = (e) => {
    let elevator = document.getElementById('elevator');

    return new Promise(resolve => {
      elevator.classList.add('close-door');

      pressedFloors.forEach(floor => {
        let clickedButton = document.getElementById(`button-${floor.value}`);
        clickedButton.classList.add('active-button');
      })
      
      setTimeout(() => {
        resolve(true);
      }, 1000)
    })

  }

  function openDoorElevator(e) {
    let elevator = document.getElementById('elevator');
    let clickedButton = document.getElementById(`button-${e.value}`);

    return new Promise(resolve => {
      elevator.classList.remove('close-door');
      clickedButton.classList.remove('active-button');

      setTimeout(() => {
        resolve(true);
      }, 500)
    })
  }

  function moveElevator(e) {
    setIsMoveElevator(true);
    const { value } = e;
    let elevator = document.getElementById('elevator');

    let floor = document.getElementById(`floor-${value}`);

    return new Promise(resolve => {
      if (value > floorInfo.value) {
        setElevatorDirection('Up')
        for (let i = elevator.offsetTop; i >= floor.offsetTop; i--) {
          elevator.style.top = i + 'px'
        }
      } else if (value < floorInfo.value) {
        setElevatorDirection('Down')
        for (let i = elevator.offsetTop; i <= floor.offsetTop; i++) {
          elevator.style.top = i + 'px'
        }
      }
      setTimeout(() => {
        resolve(true);
        setIsMoveElevator(false);
      }, 2000)
    });
  }

  async function pressedButton(e) {
    if (!isMoveElevator) {
      let idx = pressedFloors.findIndex(item => item.value === e.value);
      if (idx === -1) {
        pressedFloors.push(e);
      }

      let promise = Promise.resolve();
      pressedFloors.forEach(floor => {
        promise = promise.then(async () => {
          setFloorInfo(floor);
          await closeDoorElevator(floor)
          await moveElevator(floor)
          await openDoorElevator(floor);
          let idx = pressedFloors.findIndex(item => item.value === floor.value);
          pressedFloors.splice(idx, 1);

          return new Promise(res => {
            setTimeout(res, 1000);
          })
        })
      })
      /*promise.then(() => {
        
      })*/
    }

  }

  return (
    <div className="app">
      <div className="elevator-buttons-area">
        <div className="floor-info-area">
          <p className="floor-info">Floor {floorInfo.label}</p>
          <p className="elevator-direction-info">Direction: {elevatorDirection}</p>
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
