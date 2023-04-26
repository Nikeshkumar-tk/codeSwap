import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode,
    className?:string
}

export const PrimaryButton = (props: ButtonProps) => (
<button className={`rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500 ${props.className}`}>
    {props.children}
</button>
)