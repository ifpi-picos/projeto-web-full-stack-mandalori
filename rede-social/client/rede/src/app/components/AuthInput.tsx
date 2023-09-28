interface AuthInputProps{
    newState: (state:string)=>void, 
    label:string
    isPassword?:boolean
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