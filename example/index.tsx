import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ContextStateProvider, useContextState } from '../.';
const exampleConfig ={
  first: 'Megaman', last: 'isTheBest'
}
const exampleConfig2 ={
  count: 0
}
const App = () => {
  return (
    <div>
      <ContextStateProvider stateConfig={exampleConfig}>
        <Example />
      </ContextStateProvider>
      <ContextStateProvider stateConfig={exampleConfig2}>
        <Example2 />
      </ContextStateProvider>
    </div>
  );
};
const Example = () => {
  const {first, last} = useContextState()
  return(
    <div>
      {first} {last}
    </div>
  )
}
const Example2 = () => {
  const {count} = useContextState()
  return(
    <div>
      {count}
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'));
