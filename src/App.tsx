import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from './hooks/useStore'

function App () {
  const { fromLanguage, toLanguage, interchangeLanguages } = useStore()
  return (
    <div className="App">
      <h1>Translate</h1>
      <button onClick={() => {
        interchangeLanguages()
      }}>Cambiar a español</button><br/>
      {fromLanguage}<br/>
      {toLanguage}
    </div>
  )
}

export default App
