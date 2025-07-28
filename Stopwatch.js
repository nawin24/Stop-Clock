// import React from 'react';
// import './Stopwatch.css';

// const Separator = () => <span className="separator">:</span>;
// const pad = n => String(n).padStart(2, '0');

// class Stopwatch extends React.Component {
//   tick = null; // keep interval id off state

//   state = {
//     totalSeconds: 0,
//     running: false,
//   };

//   incrementCount = () => {
//     this.setState(s => ({ totalSeconds: s.totalSeconds + 1 }));
//   };

//   getHours = () => Math.floor(this.state.totalSeconds / 3600);       // remove % 24 so hours can exceed 24
//   getMinutes = () => Math.floor(this.state.totalSeconds / 60) % 60;
//   getSeconds = () => this.state.totalSeconds % 60;

//   startCounter = () => {
//     if (this.tick) return;
//     this.tick = setInterval(this.incrementCount, 1000);
//     this.setState({ running: true });
//   };

//   stopCounter = () => {
//     clearInterval(this.tick);
//     this.tick = null;
//     this.setState({ running: false });
//   };

//   resetCounter = () => {
//     clearInterval(this.tick);
//     this.tick = null;
//     this.setState({ totalSeconds: 0, running: false });
//   };

//   resumeCounter = () => this.startCounter();

//   componentWillUnmount() {
//     clearInterval(this.tick);
//   }

//   render() {
//     const { running } = this.state;
//     const started = this.getHours() || this.getMinutes() || this.getSeconds();

//     let buttons;
//     if (!running && !started) {
//       buttons = <button className="btn info" onClick={this.startCounter}>Start</button>;
//     } else if (!running && started) {
//       buttons = (
//         <>
//           <button className="btn info" onClick={this.resumeCounter}>Resume</button>
//           <button className="btn" onClick={this.resetCounter}>Reset</button>
//         </>
//       );
//     } else {
//       buttons = (
//         <>
//           <button className="btn danger" onClick={this.stopCounter}>Stop</button>
//           <button className="btn" onClick={this.resetCounter}>Reset</button>
//         </>
//       );
//     }

//     return (
//       <div className="stopwatch">
//         <div className="display">
//           <span className="time">{pad(this.getHours())}</span>
//           <Separator />
//           <span className="time">{pad(this.getMinutes())}</span>
//           <Separator />
//           <span className="time">{pad(this.getSeconds())}</span>
//         </div>
//         <div className="controls">
//           {buttons}
//         </div>
//       </div>
//     );
//   }
// }

// export default Stopwatch;

// Stopwatch.jsx
import React, { useState, useRef, useEffect } from 'react';
import './Stopwatch.css';

const Separator = ({ symbol = ':' }) => <span className="separator">{symbol}</span>;

function Stopwatch() {
  const [time, setTime] = useState(0);       
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const pad = n => String(n).padStart(2, '0');

  useEffect(() => {
    if (running && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 10);
    }
    if (!running && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const minutes = Math.floor(time / 100 / 60);
  const seconds = Math.floor(time / 100) % 60;
  const centi = time % 100;
  const started = time > 0;

  return (
    <div className="stopwatch">
        <h1> StopClock</h1>
      <div className="display">
        <span className="time">{pad(minutes)}</span>
        <Separator />
        <span className="time">{pad(seconds)}</span>
        <Separator symbol="." />
        <span className="time">{pad(centi)}</span>
      </div>
      <div className="controls">
        {!running && !started && (
          <button className="info" onClick={() => setRunning(true)}>Start</button>
        )}
        {!running && started && (
          <>
            <button className="info" onClick={() => setRunning(true)}>Resume</button>
            <button onClick={() => { setTime(0); setRunning(false); }}>Reset</button>
          </>
        )}
        {running && (
          <>
            <button className="danger" onClick={() => setRunning(false)}>Stop</button>
            <button onClick={() => { setTime(0); setRunning(false); }}>Reset</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Stopwatch;



