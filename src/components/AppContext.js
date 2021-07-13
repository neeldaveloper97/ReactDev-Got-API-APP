import React from 'react';
import { createContext } from 'react';

export const ContextProvider = createContext();

function AppContext({children}){
    const [showBackButton, setBackbutton] = React.useState(false);
    return(
        <ContextProvider.Provider
            value={{
                showBackButton,
                setBackbutton
            }}
        >
            {children}
        </ContextProvider.Provider>
    )
}

export default AppContext;