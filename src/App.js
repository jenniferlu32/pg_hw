import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <p>hi</p>
    )
  }
}

ReactDOM.render(< App />, document.querySelector('#app'));
export default App;
