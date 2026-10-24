import { createContext, useContext } from "react";
import type { ReactNode } from "react";

import type { WeddingConfig } from "data/weddingConfig";
import { WEDDING } from "data/weddingConfig";

const ConfigContext = createContext<WeddingConfig>(WEDDING);

/** Which event the sections show: the wedding by default, or e.g. the engagement */
export const ConfigProvider = ({
  config,
  children,
}: {
  config: WeddingConfig;
  children: ReactNode;
}) => <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;

export const useConfig = () => useContext(ConfigContext);
