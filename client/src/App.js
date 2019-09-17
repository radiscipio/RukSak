import React from 'react';
import Header from './Component/Header/Header';
import Form from './Component/Form/Form';

import './App.css';

class App extends React.Component {
  state = {
    form: {
      username: null,
      password: null,
      email: null,
    }
  }
  handleChange = async (e) => {
const{ name,value } = e.target
  this.setState(prevState => ({
    form: {
      ...prevState.form,
      [name]: value
    }
  }));
}
  render(){
    return (
      <div className="App">
        <Header />
        <Form />
      </div>
    );
  }
}

export default App;
