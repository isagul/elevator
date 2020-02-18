import React, {useState} from 'react';
import './App.scss';

let pressedFloors = [];

function App() {
  const [floorInfo, setFloorInfo] = useState({value: 6, label: '6'});
  const [elevatorDirection, setElevatorDirection] = useState('');
  const [isMoveElevator, setIsMoveElevator]= useState(false);
  // const [pressedFloors, setPressedFloors] = useState([]);
  // let pressedFloors = [];
  // const elevatorArriveTime = 1000;

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
    setIsMoveElevator(true);
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

  function openDoorElevator(e){
    setIsMoveElevator(false);
    let elevator = document.getElementById('elevator');
    let clickedButton = document.getElementById(`button-${e.value}`);
    return new Promise(resolve => {
      elevator.classList.remove('close-door');  
      clickedButton.classList.remove('active-button');
      pressedFloors = [];
      resolve(true);
    },1000)
  }

  function moveElevator(e){
    const {value} = e;
    let elevator = document.getElementById('elevator');

    let floor = document.getElementById(`floor-${value}`);

    return new Promise(resolve => {
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
      setTimeout(() => {
        resolve(true);
      }, 1500)
    });
  }

  async function pressedButton(e){
    pressedFloors.push(e);
    
    let promise = Promise.resolve();
    pressedFloors.forEach(floor => {
      promise = promise.then(async () => {
        setFloorInfo(floor);
        await closeDoorElevator(floor)
        await moveElevator(floor)
        await openDoorElevator(floor);
        return new Promise(res => {
          setTimeout(res, 1000);
        })
      })
      
    })

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
          <div className="elevator-light" style={{background: isMoveElevator ? 'red' : 'lime'}}></div>
        </div>
      </div>
    </div>
  );
}

export default App;
