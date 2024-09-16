const FieldTitle = ({children} : {children: React.ReactNode}) => {
    return (
        <>
        <div className="text-sm font-medium mb-1 whitespace-nowrap text-ellipsis overflow-hidden">{children}</div>
        </>
    )
}

export default FieldTitle;