import { useContext, createContext, useState } from 'react';

interface InitContext {
  activeChange: boolean;
  setActiveChange: any;
}
export const MarketContext = createContext({} as InitContext);

export const MarketContextProvider = ({ children }) => {
  const [activeChange, setActiveChange] = useState(true);
  const data: any = { activeChange, setActiveChange };

  return (
    <MarketContext.Provider value={data}>{children}</MarketContext.Provider>
  );
};

export const useMarketContext = () => {
  return useContext(MarketContext);
};
