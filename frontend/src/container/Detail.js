import Card from "../components/Card";
import Background from "../components/Background";
const Detail =({setInfo}) => {
    return (
        <Background component = {<Card/>}setInfo={setInfo}/>
    )
}

export default Detail