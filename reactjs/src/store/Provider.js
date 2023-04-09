import { useReducer } from "react";
import Context from "./Context";
import { initState } from "./Reducer";
import reducer from "./Reducer";

function Provider({ children }) {
    const [state,dixpacth]= useReducer( reducer, initState)
    return (
        <Context.Provider value={[state,dixpacth] }>
            { children}
        </Context.Provider>
    )
}
 
export default Provider;