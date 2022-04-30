import React, { useEffect, useState } from 'react'
import './App.css';
import * as topojson from 'topojson';
import axios from 'axios';
import Map from './Map'

function App() {
  const [map, setMap] = useState(false)
  const [mapSettings, setSettings] = useState('default')
  const [mapMeta, setMeta] = useState({
    edu: []
  })

  
  
  const init_map = () => {
    axios.get('http://localhost:8080/map')
    .then((res) => {
      const map = topojson.feature(res.data, res.data.objects.counties).features
      setMap(map)
      console.log('MAP', map)
    })
    .catch(err => console.error(err))
    axios.get('http://localhost:8080/map/education')
    .then((res) => {
      console.log(res)
      setMeta({ ...mapMeta, edu:[...res.data] })
    })
  }

  useEffect(() => {
    init_map()
  },[])

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <section className="App-body">
        <Map mapData={map} settings={mapSettings} setSettings={setSettings} metaData={mapMeta}/>
      </section>
    </div>
  );
}

export default App;
