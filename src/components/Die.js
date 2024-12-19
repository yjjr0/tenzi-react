function Die(props) {
    const styles = {
        backgroundColor: props.isHeld? "#59E391": "white"
    }

    const dieFaces = {
        1: "static/one.png",
        2: "static/two.png",
        3: "static/three.png",
        4: "static/four.png",
        5: "static/five.png",
        6: "static/six.png",
    }

    return (
        <button onClick={() => props.holdDice(props.id)}>
            <img style={styles} src={dieFaces[props.value]} alt={props.value} />
        </button>
    )
}

export default Die;