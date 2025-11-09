import { createContext, useState, useContext} from 'react';
import type { ReactNode } from 'react';

type LoadingContextType = {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({children}: {children: ReactNode}){
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
     );
}

export function useLoading(){
    const context = useContext(LoadingContext);

    if(context === undefined){
        throw new Error('useLoading deve ser usado dentro de um LoadingProvider');
    }

    return context;
}