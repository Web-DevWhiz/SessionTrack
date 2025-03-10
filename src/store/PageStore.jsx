import { createContext } from "react";
import { useContext } from "react";

export const PageContext = createContext();
const usePageContext = () => useContext(PageContext);
export default usePageContext;
