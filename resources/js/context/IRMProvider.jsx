import { createContext, useState, useEffect } from "react";

const IRMContext = createContext();

const IRMProvider = ({ children }) => {
    const [titulo, setTitulo] = useState("Instituto Real de México A.C.");

    return (
        <IRMContext.Provider
            value={{
                titulo,
                setTitulo,
            }}
        >
            {children}
        </IRMContext.Provider>
    );
};

export { IRMProvider };

export default IRMContext;
