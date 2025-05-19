import style from "./Loader.module.css";

const Loader = () => {
    return (
        <div className={style.loader_container}>
            <div className={style.loader}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        
    )
}

export default Loader