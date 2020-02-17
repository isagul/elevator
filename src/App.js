import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="app">
      <div className="elevator-buttons-area">
        <div className="floor-info-area">
          <p class="floor-info">Kat Bilgisi</p>
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
          <div className="home"></div>
        </div>
        <div className="elevator">

        </div>
      </div>
    </div>
  );
}

export default App;
