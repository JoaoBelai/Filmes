import { createContext, useState, useContext} from 'react';
// Importa o tipo 'ReactNode' para a prop 'children'.
import type { ReactNode } from 'react';

// Define a estrutura (Type) dos dados que o Contexto vai fornecer.
type LoadingContextType = {
    isLoading: boolean; // O estado (true/false) do spinner global.
    setIsLoading: (loading: boolean) => void; // A função para mudar esse estado.
}

// Cria o Contexto com o tipo definido, iniciando como 'undefined'.
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({children}: {children: ReactNode}){
    // Cria o estado 'isLoading'. Começa como 'false'
    const [isLoading, setIsLoading] = useState(false);

    // Renderiza o Provider do React.
    // O 'value' passa o estado 'isLoading' e a função 'setIsLoading'
    // para todos os componentes "filhos" que estiverem dentro dele.
    return (
            <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
                {children}
            </LoadingContext.Provider>
        );
}

// Hook customizado (useLoading) que simplifica o uso deste contexto.
export function useLoading(){
    // Usa o hook 'useContext' para ler os dados fornecidos pelo 'LoadingProvider'.
    const context = useContext(LoadingContext);

    // Verificação de segurança: Se 'context' for 'undefined', significa que
    // o 'useLoading()' foi chamado fora do 'LoadingProvider'.
    if(context === undefined){
            throw new Error('useLoading deve ser usado dentro de um LoadingProvider');
    }

    // Retorna os dados do contexto (isLoading e setIsLoading) para o componente.
    return context;
}