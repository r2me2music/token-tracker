import React from "react"
import "./index.css"

export default function Main() {

  // --sets state for fetched price from API

  const [display, setDisplay] = React.useState("");

  // --arbitrary counter
  // trigger useEffect when progress bar restarts

  const [count, setCount] = React.useState(0);

  const elem = document.getElementById("price-text");

  // --Sets state for text color/flash annimation

  const [priceColor, setPriceColor] = React.useState();

  // --fetch price from API
  // fixes data to 2 decimal places
  // triggers text color state annimation
  // triggers progress bar
  // uses arbitrary count state as dependency

  React.useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd")
      .then(res => res.json())
      .then(data => setDisplay(data.solana.usd.toFixed(2)))
    animateTextColor()
    move();
  }, [count]);

  // --Trigger text color/flash css animation

  function animateTextColor() {
    setPriceColor(prevColor => "priceFlash")
  };

  // --Trigger text to default color (to reset animation)
  // triggered by onAnnimationEnd in h1 tag

  function resetTextColor() {
    setPriceColor(prevColor => "defaultText")
  };

  // --Progress bar (from online example)
  // 100% full triggers arbitray count state 
  // which is the dependency for useEffect to 
  // fetch data from API

  function move() {
    var elem = document.getElementById("myBar")
    var width = 1;
    var id = setInterval(frame, 70);
    function frame() {
      if (width == 100) {
        clearInterval(id);
        setCount(prevCount => prevCount + 1);
      } else {
        width++;
        elem.style.width = width + '%';
      };
    };
  };

  // --h1 tag displays price
  // ternary to display "--" if api call doesn't fetch data
  // className change to display text color flash annimation
  // --myBar div displays progress bar annimation

  return (
    <main>
      <div id="main-body">
        <div id="title-bar">
          <h2>Token Tracker</h2>
        </div>
        <div id="price-section">
          <h2>Solana/USD:</h2>
          <h1 
            id="price-text" 
            className={priceColor} 
            onAnimationEnd={resetTextColor}
          >
            ${Number.isNaN(display) ? "--" : display}
          </h1>
          <div className="progress-container-w3">
            <div id="myBar" className="progress-bar-w3"></div>
          </div>
        </div>
      </div>
      <footer>
        <p>Token Tracker made by r2</p>
      </footer>
    </main>
  )
};