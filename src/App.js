import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import MoviesList from './movies/MoviesList'
import MovieDetail from './movies/MovieDetail'

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/movie/:id" component={MovieDetail} />
					<Route path="/:page" component={MoviesList} />
					<Route path="/" component={MoviesList} />
				</Switch>
			</Router>
		</div>
	)
}

export default App
