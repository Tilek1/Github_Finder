import React, {Component,Fragment} from 'react';
import './App.css'
import axios from 'axios'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Users from './components/Users/Users'
import User from './components/Users/User'
import Search from './components/Users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'

class App extends Component {

  state = {
    users : [],
    user: {},
    loading: false,
    alert: null,
    repos: []
  }

 /* async componentDidMount() {
      this.setState({loading: true})
      const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      this.setState({
        users: res.data,
        loading: false
      })
  }
*/
// Search Github users
  searchUsers = async (text) => {
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({
      users: res.data.items,
      loading: false,
      alert: null
    })
  }

  // Get a single Github user
  getUser = async (username) => {
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({user: res.data, loading: false})
  }

  // Get users Repo

  getUserRepos = async username => {
    this.setState({loading: true})

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({repos: res.data, loading: false})  
  }

  clearUsers = () => {
    this.setState({
      users: [],
      loading: false,
      alert: null
    })
  }

  setAlert = (msg, type) => {
    this.setState({ alert : {msg, type}})
    
    setTimeout(() => this.setState({alert: null}), 5000)
  }

  render() {
    const {users, user, loading, repos} = this.state
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search setAlert={this.setAlert} searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={ users.length > 0 ? true : false}/>
                  <Users users={users} loading={loading}/>              
                </Fragment>
              )} />
              <Route path="/about" component={About} />
              <Route exact path="/user/:login" render={props => (
                  <User {...props} getUser={this.getUser} user={user} loading={loading} getUserRepos={this.getUserRepos}
                    repos={repos}
                  />
                )}/>
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;