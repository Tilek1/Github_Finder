import React, { Component } from 'react';
import PropTypes from 'prop-types'


class Search extends Component {
	state = {
		text: ''
	}

	static propTypes = {
		searchUsers: PropTypes.func.isRequired,
		clearUsers: PropTypes.func.isRequired,
		showClear: PropTypes.bool.isRequired,
		setAlert : PropTypes.func.isRequired
	}

	handleChange = (e) => {
		const {name, value} = e.target
		this.setState({
			[name] : value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if(this.state.text === '') {
			this.props.setAlert('Please enter something', 'light')
		} else {
			this.props.searchUsers(this.state.text)
			this.setState({
				text: ''
			})
		}
	}

	render() {
		const {showClear, clearUsers} = this.props
		return (
			<div>
				<form className="form" onSubmit={this.handleSubmit}>
					<input type="text" onChange={this.handleChange} name="text" placeholder="Search Users..." value={this.state.text}/>
					<input type="submit" value="Search" className="btn btn-dark btn-block" />
				</form>
				{showClear && (<button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>) }
			</div>
		)
	}
}

export default Search