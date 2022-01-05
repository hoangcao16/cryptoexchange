import { useContext, createContext, useState } from 'react';

interface InitContext {
  activeChangeColumnMarket: boolean;
  setActiveChangeColumnMarket: any;
  stepRegister: number;
  setStepRegister: any;
  emailRegister: string;
  setEmailRegister: any;
}
export const GlobalContext = createContext({} as InitContext);

export const GlobalContextProvider = ({ children }) => {
  const [activeChangeColumnMarket, setActiveChangeColumnMarket] =
    useState(true);
  const [stepRegister, setStepRegister] = useState(1);
  const [emailRegister, setEmailRegister] = useState('');
  const data: any = {
    activeChangeColumnMarket,
    setActiveChangeColumnMarket,
    stepRegister,
    setStepRegister,
    emailRegister,
    setEmailRegister,
  };

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
