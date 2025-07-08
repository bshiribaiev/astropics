import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const API_KEY = import.meta.env.VITE_NASA_API_KEY
  const [apodData, setApodData] = useState(null)
  const [banList, setBanList] = useState([])

  const getDate = () => {
    const month = Math.floor(Math.random() * 12) + 1
    const day = Math.floor(Math.random() * 28) + 1
    const date = `2024-${month}-${day}`
    if (banList.includes(date))
      return getDate()
    return date
  }

  const getData = async() => {
    const date = getDate()
    const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`

    try {
      let response = await axios.get(url)
      while (banList.includes(response.data.copyright))
        response = await axios.get(url)
      return response.data
    }
    catch(e) {
      console.log(e.message)
    }
  }

  const handleClick = async() => {
    const data = await getData()
    setApodData(data)
  }

  const handleBan = (newItem) => {
    if (!(banList.includes(newItem)))
      setBanList(prevBanList => [...prevBanList, newItem])
  }

  const removeBan = (itemR) => {
    setBanList(prevBanList => {return prevBanList.filter(item => item !== itemR)})
  }
  return (
    <>
      <div> 
        <h1>Astropics</h1>
        <button onClick={handleClick} className='explore'> 
          Explore
        </button>
      </div>

      <div> 
        {apodData && (
          <div className='nasa'>
            <h2>{apodData.title}</h2> 
            <div className='buttons'> 
              <button onClick={() => handleBan(apodData.date)}>{apodData.date}</button>
              {apodData.copyright ? (
                <button onClick={() => handleBan(apodData.copyright)}>{apodData.copyright}</button>
              ) : (
                <button>No copyright info</button>
              )}
              <button onClick={() => window.open(apodData.hdurl)}>Link</button>
            </div>

            <div className='pic'>
              <img src={apodData.url} alt={apodData.title} /> 
            </div>

            <div>
              <h2>Ban List</h2>
              {banList && (
                <div className='ban'> 
                  {banList.map(item => (
                    <button onClick={() => removeBan(item)}>{item}</button>
                  ))}
                </div> 
              )}
            </div>
          </div>

        )}
      </div>
    </>
  )
}

export default App