import React, {useState} from 'react';
import './App.scss';

function App() {
  const [floorInfo, setFloorInfo] = useState({value: 6, label: '6'});
  const [elevatorDirection, setElevatorDirection] = useState('');
  const [pressedFloors, setPressedFloors] = useState([]);
  // let pressedFloors = [];
  const elevatorArriveTime = 1000;

  const elevatorButtons = () => {
    let floors = [
      {value: 5, label: '5' },
      {value: 6, label: '6' },
      {value: 3, label: '3' },
      {value: 4, label: '4' },
      {value: 1, label: '1' },
      {value: 2, label: '2' },
      {value: 0, label: 'Z' }
    ];
    return floors.map((floor, index) => {
      return (
        <div className="outer" key={index}>
          <button className="button" onClick={() => pressedButton(floor)} id={`button-${floor.value}`}>{floor.label}</button>
        </div>
      )
    })
  }

  const closeDoorElevator = (e) => {
    let elevator = document.getElementById('elevator');    
    elevator.classList.add('close-door');

    let clickedButton = document.getElementById(`button-${e.value}`);
    clickedButton.classList.add('active-button')
  }

  function openDoorElevator(e){
    let elevator = document.getElementById('elevator');
    elevator.classList.remove('close-door');

    let clickedButton = document.getElementById(`button-${e.value}`);
    clickedButton.classList.remove('active-button')
  }

  function pressedButton(e){
    closeDoorElevator(e);
    setPressedFloors(prevFloors => [...prevFloors, e])
    setTimeout(() => {
      const {value} = e;
      /*setPressedFloors(prevFloors => [...prevFloors, value])
      console.log('pressed floors', pressedFloors);*/
      let elevator = document.getElementById('elevator');
      let floor = document.getElementById(`floor-${value}`);

      if (value > floorInfo.value) {
        setElevatorDirection('Yukarı')
        for (let i = elevator.offsetTop; i >= floor.offsetTop; i--) {
          elevator.style.top = i + 'px'
        }
      } else {
        setElevatorDirection('Aşağı')
        for (let i = elevator.offsetTop; i <= floor.offsetTop; i++) {
          elevator.style.top = i + 'px'
        }
      }
    }, elevatorArriveTime)
    setTimeout(() => {
      openDoorElevator(e);
      setFloorInfo(e);

    },elevatorArriveTime + 1000)
    
  }

  return (
    <div className="app">
      <div className="elevator-buttons-area">
        <div className="floor-info-area">
          <p className="floor-info">{floorInfo.label}. Kat</p>
          <p className="elevator-direction-info">Yön: {elevatorDirection}</p>
        </div>
        <div className="elevator-buttons">
          {elevatorButtons()}
        </div>
      </div>
      <div className="building">
        <div className="floor" id="floor-6">
          <div className="home">
            <div className="room">

            </div>
          </div>
          <div className="home">
            <div className="room">

            </div>
          </div>
        </div>
        <div className="floor" id="floor-5">
          <div className="home">
            <div className="room">

            </div>
          </div>
          <div className="home">
            <div className="room">

            </div>
          </div>
        </div>
        <div className="floor" id="floor-4">
          <div className="home">
            <div className="room">

            </div>
          </div>
          <div className="home">
            <div className="room">

            </div>
          </div>
        </div>
        <div className="floor" id="floor-3">
          <div className="home">
            <div className="room">

            </div>
          </div>
          <div className="home">
            <div className="room">

            </div>
          </div>
        </div>
        <div className="floor" id="floor-2">
          <div className="home">
            <div className="room">

            </div>
          </div>
          <div className="home">
            <div className="room">

            </div>
          </div>
        </div>
        <div className="floor" id="floor-1">
          <div className="home">
            <div className="room">

            </div>
          </div>
          <div className="home">
            <div className="room">

            </div>
          </div>
        </div>
        <div className="floor" id="floor-0">
          <div className="home">
            <div className="door"></div>
            <div className="door"></div>
          </div>
        </div>
        <div className="elevator" id="elevator">
          <div className="elevator-door"></div>
          <div className="elevator-light"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
