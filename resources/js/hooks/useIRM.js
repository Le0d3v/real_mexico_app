import { useContext } from "react";
import IRMContext from "../context/IRMProvider";

const useIRM = () => {
    return useContext(IRMContext);
};

export default useIRM;
