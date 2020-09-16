import * as React from 'react'

interface ContextStateInterface {
  children: React.ReactNode,
  stateConfig: object,
  cacheStateKey?: string 
}
export const ContextState = React.createContext<any>({})

export function ContextStateProvider(props: ContextStateInterface) {
  const initialState = props.cacheStateKey && sessionStorage[props.cacheStateKey] ? JSON.parse(sessionStorage[props.cacheStateKey]) : props.stateConfig

  // Dynamically creates the reducer dependent on the stateConfig
  function globalReducer(state: any, action: { type: any; stateConfig: any }) {
    const actions: any = {}
    Object.keys(props.stateConfig).forEach(stateKey => {
      actions[stateKey] = { ...state, [stateKey]: action.stateConfig[stateKey] }
    })
    return actions[action.type]
  }

  const [state, dispatch] = React.useReducer(globalReducer, initialState)


  function updateContextState(newStateValues: any = {}) {
    Object.keys(newStateValues).forEach(stateKey => {
      const updateObject = {
        type: stateKey, stateConfig: { [stateKey]: newStateValues[stateKey] },
      }
      dispatch(updateObject)
    })
  }

React.useEffect(() => {
  if(props.cacheStateKey){
    sessionStorage.setItem(props.cacheStateKey, JSON.stringify(state))
  }
}, [state, props.cacheStateKey])

  return (
    <ContextState.Provider value={{
      ...state,
      updateContextState
    }}>
      {props.children}
    </ContextState.Provider>
  )
}

export function useContextState() {
  return React.useContext(ContextState)
}
