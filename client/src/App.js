import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Header from './Component/Header/Header';
import Login from './Component/Login/Login';
import Main from './Component/main/main.js';
import Planning from './Component/planning/Planning';
import Profile from './Component/Profile/Profile';
import Register from './Component/Form/Register';
import { allGear, oneGear, deleteGear, loginUser, registerUser} from './services/api';

import './App.css';

class App extends React.Component {
  state = {
    currentUser: null,
    form: {
      username: "",
    },
    authFormData: {
      email: "",
      username: "",
      password: "",
    },
    authLoginData: {
      username: "",
      password: "",
    },
    isShowing: false,
  }

handleChange = async (e) => {
  const{ name,value } = e.target
  this.setState(prevState => ({
    form: {
      [name]: value
    }
  }));
};

handleLogin = async (e) => {
  // e.preventDefault();
  const userData = await loginUser(this.state.authFormData);
  this.setState({
    currentUser: userData.user
  })
  localStorage.setItem("jwt", userData.token)
};

handleLog = async (e) => {
  e.preventDefault();
  const userData = await loginUser(this.state.authLoginData);
  this.setState({
    currentUser: userData.user
  })
  localStorage.setItem("jwt", userData.token)
};

handleRegister = async (e) => {
  e.preventDefault();
  await registerUser(this.state.authFormData);
  this.handleLogin();
};

handleLogout = () => {
  localStorage.removeItem("jwt");
  this.setState({
    currentUser: null
  })
}

handleAuth = async (e) => {
  const { name, value } = e.target
  this.setState(prevState => ({
    authFormData: {
      ...prevState.authFormData,
      [name]: value,
    }
  }))
};

handleAuthLogin = async (e) => {
  const { name, value } = e.target
  this.setState(prevState => ({
    authLoginData: {
      ...prevState.authLoginData,
      [name]: value,
    }
  }))
};

handleRegisterClick = async (e) => {
  this.setState({
    isShowing: true
  })
};



  render(){
    return (
      <>
      <div className="App">
        <Header />
        <Login  handleLogin={(e) => this.handleLogin(e)}
                handleRegister={(e) => this.handleRegister(e)}
                authFormData={this.state.authFormData}
                authLoginData={this.state.authLoginData}
                handleChange={this.handleAuthLogin}
                handleAuthChange={this.handleAuth}
                handleLog={(e) => this.handleLog(e)}
                handleRegisterClick={(e) => this.handleRegisterClick(e)}
                />
      </div>
      <div>
        <Switch>
          <Route path='/home' component={Main} />
          <Route path='/planning' component={Planning} />
          <Route path='/profile' component={Profile} />
          />
        </Switch>
      </div>
      </>
    );
  }
}

export default App;
