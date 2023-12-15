// Interface para as propriedades do componente AuthInput
interface AuthInputProps {
    newState: (state: string) => void; // Função para atualizar o estado no componente pai
    label: string; // Rótulo do campo de entrada
    isPassword?: boolean; // Indica se o campo é para senha (opcional, padrão é falso)
}

function AuthInput(props:AuthInputProps) {

    return (
        <div className="flex flex-col justify-between items-start">
            <label>{props.label}</label>
            <input 
            type= {props.isPassword?"password":"text"}
            onChange={(e)=>props.newState(e.currentTarget.value)}
            className="border-gray-6400 border-b w-full focus-visible:border-gray-700 focus-visible:border-b focus-visible:outline-none" />
        </div>
    )
}

export default AuthInput;