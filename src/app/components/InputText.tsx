
export type InpuTextProps = {
    label: string
}

const InputText = (props: InpuTextProps) => {
    return (
        <label>
            {props.label}:
            <input type="text" name={props.label} />
        </label>
    )
}

export default InputText;
// function InpuText(label: string) {
//     return (

//         <input type="text" name={label}></input>

//     )
// }
