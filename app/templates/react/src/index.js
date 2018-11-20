import React from 'react'
import ReactDOM from 'react-dom'

import './style/index.css'

import { BrowserRouter as Router, Route, Link } from "react-router-dom"

class Home extends React.Component {
	render() {
		return (
			<div>this a Home page</div>
		)
	}
}
class Other extends React.Component {
	render() {
		return (
			<div>this a Other page</div>
		)
	}
}
class Main extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<ul>
						<li><Link to="/home">首页</Link></li>
						<li><Link to="/other">其他页</Link></li>
					</ul>
					<Route path="/home" component={Home} />
					<Route path="/other" component={Other} />
				</div>
			</Router>
		)
	}
}
ReactDOM.render(<Main />, document.body.appendChild(document.createElement('div')));
