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
        console.log("fetch price")
  }

  // fetch price on mount (page load)

  React.useEffect(() => {
    getPrice()
  }, [])

  // update price every 10 seconds

  React.useEffect(() => {
    const interval = setInterval(() => {
      getPrice()
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  

  return (
    <main>
      <div id="main-body">
        <h2>Solana price:</h2>
        <div 
          id="price-text"
          onClick={getPrice}
        >
          <h1>
            ${display}
          </h1>
        </div>
      </div>
      <footer>
        <p>[T2] Token Tracker made by r2</p>
      </footer>
    </main>
  )
}