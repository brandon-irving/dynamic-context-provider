import * as React from 'react';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ContextStateProvider, ContextState } from '../src';


test('ContextStateProvider generates state values from stateConfig', () => {
  const providerProps = {
    first: 'Mega',
    last: 'Man',
  }

   render(
  <ContextStateProvider stateConfig={providerProps}>
    <ContextState.Consumer>
  {(value: any)=><span>Received: {value.first} {value.last}</span>}
    </ContextState.Consumer>
  </ContextStateProvider>
  )
  expect(screen.getByText(/^Received:/).textContent).toBe('Received: Mega Man')

})
