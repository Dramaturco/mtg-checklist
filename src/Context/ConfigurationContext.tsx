import { createContext } from "react";
import { ConfigurationContextType } from "../@types/Configuration";

const ConfigurationContext = createContext<ConfigurationContextType | null>(null);

export default ConfigurationContext;