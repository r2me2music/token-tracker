import React from "react"
import "./index.css"

export default function Main() {

  // --state to display price

  const [display, setDisplay] = React.useState("");

  // --arbitrary counter for useEffect

  const [count, setCount] = React.useState(0);

  // --Fixed 2 decimal places for displayed price

  const priceNum = parseFloat(display);

  const priceFixedDec = priceNum.toFixed(2);

  // --Price color indicators

  const [priceColor, setPriceColor] = React.useState();

  // --fetch price from API 

  React.useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd")
      .then(res => res.json())
      .then(data => setDisplay(data.solana.usd))
    animateTextColor()
    move();
  }, [count]);

  // --Trigger text color css animation

  function animateTextColor() {
    setPriceColor(prevColor => "priceFlash")
  };

  // --Trigger text color default (to reset animation)

  function resetTextColor() {
    setPriceColor(prevColor => "defaultText")
  };

  // --Progress bar

  function move() {
    var elem = document.getElementById("myBar")
    var width = 1;
    var id = setInterval(frame, 50);
    function frame() {
      if (width == 100) {
        clearInterval(id);
        console.log("cleared Interval");
        setCount(prevCount => prevCount + 1);
      } else {
        width++;
        elem.style.width = width + '%';
        console.log(width);
      };
    };
  };


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
            ${priceFixedDec}
          </h1>
          <div className="progress-container-w3">
            <div id="myBar" className="progress-bar-w3"></div>
          </div>
          {/* <button 
            onClick={() => setCount(prevCount => prevCount + 1)}
          >
            Count
          </button> */}
        </div>
      </div>
      <footer>
        <p>Token Tracker made by r2</p>
      </footer>
    </main>
  )
};