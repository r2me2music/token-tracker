import React from "react"
import "./index.css"

export default function Main() {
  const [display, setDisplay] = React.useState({
    price: "--"
  })

  const [currentPrice, setCurrentPrice] = React.useState([])

  React.useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd")
        .then(res => res.json())
        .then(data => setCurrentPrice(data.solana.usd))
        console.log("fetch ran")
        console.log(currentPrice)
        // setTimeout(updatePrice, 3000)
  }, [getPrice])

  function getPrice() {
    const price = currentPrice.price
    setDisplay(prevDisplay => ({
      ...prevDisplay,
      price: price
    }))
    console.log("price updated from click")
  }

  // function handleChange(event) {
  //   const {name, value} = event.target
  //   setDisplay(prevDisplay => ({
  //     ...prevDisplay,
  //     [name]: value
  //   }))
  // }
  

  return (
    <main>
      <div id="main-body">
        <h2>Solana price: </h2>
        <div 
          // name="price"
          // value={display.price}
          // onChange={handleChange}
          onClick={getPrice}
        >
          <h2>
            {display.price}
          </h2>
        </div>
      </div>
      <footer>
        <p>[T2] Token Tracker made by r2</p>
      </footer>
    </main>
  )
}