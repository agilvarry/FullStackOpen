import ReactDOM from 'react-dom'
import App from './App'
import numberHelp from './numbers'



numberHelp.getAll().then(response => {
  ReactDOM.render(
    <App numbers={response} />,
    document.getElementById('root')
  )
})