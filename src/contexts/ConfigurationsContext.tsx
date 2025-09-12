import { createContext } from "react";

interface IConfigurationsContext {
  shouldThrow: boolean;
}

export const ConfigurationsContext = createContext(
  {} as IConfigurationsContext
);
