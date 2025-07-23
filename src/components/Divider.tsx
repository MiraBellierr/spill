import divider from "../assets/divider.png";

const Divider = () => {
    return (
        <div className="flex flex-row">
            <img className="h-5 w-60 hidden md:block" src={divider}/>
            <img className="h-5 w-60 hidden md:block" src={divider}/>
            <img className="h-5 w-60 hidden md:block" src={divider}/>
        </div>    
    )
}

export default Divider;