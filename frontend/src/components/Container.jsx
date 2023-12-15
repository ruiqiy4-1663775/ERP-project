function Container({children, width, className}) {

    return (
        <div className={`${width} ${className} mx-auto rounded-lg bg-white px-4 py-6 border-violet-300 shadow-lg`}>
            {children}
        </div>
    )
}

export default Container;