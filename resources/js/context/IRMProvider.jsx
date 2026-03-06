import { createContext, useState, useEffect } from "react";

const IRMContext = createContext();

const IRMProvider = ({ children }) => {
    const [titulo, setTitulo] = useState("Instituto Real de México A.C.");
    const [page, setPage] = useState(0);

    return (
        <IRMContext.Provider
            value={{
                titulo,
                setTitulo,
                page,
                setPage,
            }}
        >
            {children}
        </IRMContext.Provider>
    );
};

export { IRMProvider };

export default IRMContext;
