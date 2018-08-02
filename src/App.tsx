import * as React from 'react';
import './App.css';
import { AppContent } from './components/app-content/app-content';

class App extends React.Component {
  public render() {
    return (
      <div className='app'>
          <header className='app__header'>Neo visual!</header>
        <AppContent/>
      </div>
    );
  }
}

export default App;
