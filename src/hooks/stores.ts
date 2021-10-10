import { createContext, useContext } from 'react'
import { rootStore } from "../stores";

export const StoresContext = createContext(rootStore)

export const useStores = () => useContext(StoresContext)