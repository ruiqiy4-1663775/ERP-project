export function FormHeader({children}) {
    return (
        <h1 className="text-xl font-semibold">{children}</h1>
    )
}

export function InputGrid({children}) {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 md:gap-x-10 md:gap-y-2">
            {children}
        </div>
    )
}

export function FormLabel({children}) {
    return (
        <label className="font-medium"> {children} </label>
    )
}