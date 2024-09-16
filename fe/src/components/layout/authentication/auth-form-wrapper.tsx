export default function AuthFormWrapper ({children} : {children : React.ReactNode}) {
    return (
        <div className="grid grid-flow-row lg:gap-5 xs:gap-3">
            {children}
        </div>
    )
}