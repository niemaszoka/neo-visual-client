import * as React from 'react';
import './App.css';
import {NeoMap} from './components';

class App extends React.Component {
  public render() {
    return (
      <div className='app'>
          <header className='app__header'>Neo visual!</header>
        <div className='app__content'>
          <NeoMap/>
        </div>
      </div>
    );
  }
}

export default App;
