import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Slider from "./components/Slider/Slider";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col">
            <Slider />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
