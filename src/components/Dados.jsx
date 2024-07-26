



const Dados = (props) => {
    return (
        <>
            <div>
                <div className=" w-full h-[150px] p-3">
                    <div className=" flex items-center gap-3">
                        <p className=" w-[60px] h-[60px] text-center flex justify-center items-center shadow rounded-full p-2 font-bold text-2xl">{props.icon}</p>
                        <p className=" font-medium text-base text-slate-500">{props.text}</p>
                    </div>

                    <div className=" flex ml-6 justify-center items-center gap-3">
                        <p className=" text-center text-3xl font-bold">{props.number}</p>
                        <p className=" w-[60px] text-xs font-medium flex justify-between items-center rounded-full p-2 bg-green-200"> <span>{props.porcent}</span> <span className=" rotate-45 text-green-500" >{props.icon2}</span></p>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Dados