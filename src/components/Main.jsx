import React from "react"
import "./index.css"

export default function Main() {

  // state to display price
  const [display, setDisplay] = React.useState("");

  // fetch price from API 
  const getPrice = () => {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd")
      .then(res => res.json())
      .then(data => setDisplay(data.solana.usd))
    animateTextColor()
  }

  // Fixed 2 decimol places for displayed price
  const priceNum = parseFloat(display);
  const priceFixed = priceNum.toFixed(2);
    
  // Price color indicators
  const [priceColor, setPriceColor] = React.useState()

  // Trigger text color css animation
  function animateTextColor() {
    setPriceColor(prevColor => "priceFlash")
  }

  // Trigger text color default (to reset animation)
  function resetTextColor() {
    setPriceColor(prevColor => "defaultText")
  }
  
  // Timer with progress meter
  const progressArray = []
  const progressBar = document.getElementById("progress-bar")

  // Reset counter/progress bar on mount
  React.useEffect(() => {
      resetArray()
  }, []) 
  
  // Counter, 
  React.useEffect(() => {
    const interval = setInterval(() => {
      progressBarIncrease()
        let progressArrayBar = ""
        for (let i = 0; i < progressArray.length; i++) {
          progressArrayBar += `${progressArray[i]}`
        }
        progressBar.innerHTML = progressArrayBar  
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  function progressBarIncrease() {
    if (progressArray.length < 5) {
      progressArray.push("[]")
    } else resetArray()
  }

  function resetArray() {
    progressArray.length = 0;
    progressArray.push();
    getPrice();
  }

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
            onClick={getPrice}
            onAnimationEnd={resetTextColor}
          >
            ${priceFixed}
          </h1>
            <div 
              id="progress-bar-section" 
              onClick={resetArray}
            >
              <h2>[Refresh]</h2>
              <h2 id="progress-bar"></h2>
            </div>
        </div>
      </div>
      <footer>
        <p>Token Tracker made by r2</p>
      </footer>
    </main>
  )
}