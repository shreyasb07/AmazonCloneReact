import React, {createContext, useContext, useReducer} from "react";

//Prepares datalayer
export const StateContext = createContext();


//wrap app and provide datalayer
export const StateProvider = ({reducer, initialState, children})=>(
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
);
//pull info from datalayer
export const useStateValue = () => useContext(StateContext);