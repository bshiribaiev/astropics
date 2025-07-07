import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const API_KEY = import.meta.env.VITE_NASA_API_KEY
  const [apodData, setApodData] = useState(null)

  const getData = async() => {
    const month = Math.floor(Math.random() * 12) + 1
    const day = Math.floor(Math.random() * 28) + 1
    const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=2024-${month}-${day}`

    try {
      const response = await axios.get(url)
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

  return (
    <>
      <div> 
        <button onClick={handleClick}> 
          Explore
        </button>
      </div>

      <div> 
        {apodData && (
          <div className='nasa'>
            <h2>{apodData.title}</h2> 
            <div className='buttons'> 
              <button>{apodData.date}</button>
              {apodData.copyright ? (
                <button>{apodData.copyright}</button>
              ) : (
                <button>No copyright info</button>
              )}
              <button onClick={() => window.open(apodData.hdurl)}>Link</button>
            </div>

            <div className='pic'>
              <img src={apodData.url} alt={apodData.title} /> 
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App
