function Container({children, width}) {

    return (
        // <div className={`${width} ${height} mx-auto rounded-3xl shadow-2xl px-4 py-6 shadow-slate-400  border border-violet-300`}>
        //     {children}
        // </div>
        <div className={`${width} mx-auto rounded-3xl bg-white px-4 py-6 border-violet-300 shadow-lg`}>
            {children}
        </div>
    )
}

export default Container;