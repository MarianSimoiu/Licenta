

const TextBar = (props) => {

    return(
        <div className="welcome-text">
            <h4>{props.text}</h4>
            <p class="text-secondary">{props.subText}</p>
        </div>
    )
}

export default TextBar;