import React from 'react'
import Year from './components/Year/Year'
import Data from './services/Data/Data'
import './App.css'

function App() {
  const dataService = new Data()
  const bitData = dataService.getData()

  return (
    <div className="App">
      <Year bitData={bitData} />
    </div>
  )
}

export default App
