import { createContext, useState, useEffect, useRef } from "react";

const IRMContext = createContext();

const IRMProvider = ({ children }) => {
    const [titulo, setTitulo] = useState("Instituto Real de México A.C.");
    const [page, setPage] = useState(0);
    const [adminPage, setAdminPage] = useState(0);
    const adminContentScroll = useRef();
    const [user, setUser] = useState(null);

    return (
        <IRMContext.Provider
            value={{
                titulo,
                setTitulo,
                page,
                setPage,
                adminPage,
                setAdminPage,
                adminContentScroll,
                user,
                setUser,
            }}
        >
            {children}
        </IRMContext.Provider>
    );
};

export { IRMProvider };

export default IRMContext;
