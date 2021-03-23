import React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
 
 
class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  state = {
    "guess": null,
  }

  preProcess(data){
    let cleaned = data.map( line => line.paths.map(point => [Math.floor(Math.round(point.x * 100 ) / 100), Math.floor(Math.round(point.y * 100) / 100)] ))
    return cleaned
  }

  postPicData(processedData) {
    console.log(processedData)
    fetch("https://draw-search-api.herokuapp.com/process/", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(processedData)
    })
    .then( res => res.json())
    .then(res => {
      console.log("response: ", res)
      this.setState({'guess': res})
    })
  }
 
  render() {
    return (
      <div class="center-within colored">
        <div class="top-margin">
          <ReactSketchCanvas
            
            ref={this.canvas}
            strokeWidth={5}
            strokeColor="black"
            width="99px"
            height="99px"
          />
         </div>
        <button class="btn-small waves-effect waves-light" 
          onClick={() => {
            this.canvas.current
              .exportPaths()
              .then(data => {
                console.log(data[0].paths);
                let cleaned = this.preProcess(data)
                this.postPicData(cleaned)
              })
              .catch(e => {
                console.log(e);
              });
          }}
        >
      
          Search
        </button>
        {this.state.guess && 
        <div>
        <button class="btn-small waves-effect waves-light red" 
        onClick= {() => {
          this.canvas.current.resetCanvas()
          this.state.guess = null
        }}>
        
          Clear
        </button>
          <p class="message">You probably drew an "{this.state.guess}"</p>
        </div>
        }
      </div>
    );
  }
};

export default Canvas