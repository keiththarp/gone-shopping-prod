import { useContext, useState, useEffect, createContext } from "react";

const SampleContext = createContext();

export function useSample() {
  return useContext(SampleContext);
}

export function SampleProvider({ children }) {
  const [state, setState] = useState([]);

  const beginningFunction = () => {
    setState();
  };

  useEffect(() => {
    beginningFunction();
  }, []);

  const value = {
    state,
  };

  return (
    <SampleContext.Provider value={value}>{children}</SampleContext.Provider>
  );
}
