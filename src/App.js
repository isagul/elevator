import React, {useState} from 'react';
import './App.scss';

function App() {
  const [floorInfo, setFloorInfo] = useState(6);
  const [elevatorDirection, setElevatorDirection] = useState('Aşağı');

  return (
    <div className="app">
      <div className="elevator-buttons-area">
        <div className="floor-info-area">
          <p class="floor-info">{floorInfo}. Kat</p>
          <p class="elevator-direction-info">Yön: {elevatorDirection}</p>
        </div>
        <div className="elevator-buttons">
          <div className="outer">
            <button className="button">6</button>
          </div>
          <div className="outer">
            <button className="button">5</button>
          </div>
          <div className="outer">
            <button className="button">4</button>
          </div>
          <div className="outer">
            <button className="button">3</button>
          </div>
          <div className="outer">
            <button className="button">2</button>
          </div>
          <div className="outer">
            <button className="button">1</button>
          </div>
          <div className="outer">
            <button className="button">Z</button>
          </div>
        </div>
      </div>
      <div className="building">
        <div className="floor">
          <div className="home">
            <div className="room">

            </div>
          </div>
          <div className="home">
            <div className="room">

            </div>
          </div>
        </div>
        <div className="floor">
          <div className="home">
            <div className="room">

            </div>
          </div>
          <div className="home">
            <div className="room">

            </div>
          </div>
        </div>
        <div className="floor">
          <div className="home">
            <div className="room">

            </div>
          </div>
          <div className="home">
            <div className="room">

            </div>
          </div>
        </div>
        <div className="floor">
          <div className="home">
            <div className="room">

            </div>
          </div>
          <div className="home">
            <div className="room">

            </div>
          </div>
        </div>
        <div className="floor">
          <div className="home">
            <div className="room">

            </div>
          </div>
          <div className="home">
            <div className="room">

            </div>
          </div>
        </div>
        <div className="floor">
          <div className="home">
            <div className="room">

            </div>
          </div>
          <div className="home">
            <div className="room">

            </div>
          </div>
        </div>
        <div className="floor">
          <div className="home">
            <div className="door"></div>
            <div className="door"></div>
          </div>
        </div>
        <div className="elevator">
          <div class="elevator-door"></div>
          <div class="elevator-light"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
