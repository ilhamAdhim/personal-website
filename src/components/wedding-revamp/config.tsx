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

/** The two people in the order this page shows them (bride first when `brideFirst` is set) */
export const coupleOf = (cfg: WeddingConfig) => {
  const [first, second] = cfg.brideFirst
    ? [cfg.bride, cfg.groom]
    : [cfg.groom, cfg.bride];
  return {
    first,
    second,
    names: `${first.short} & ${second.short}`,
    initials: `${first.short[0]}&${second.short[0]}`,
  };
};

export const useCouple = () => coupleOf(useConfig());
