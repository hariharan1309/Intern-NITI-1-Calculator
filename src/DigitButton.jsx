import { ACTIONS } from "./App"
import PropTypes from "prop-types"

export default function DigitButton({dispatch,digit}){
    return (
        <button onClick={()=>dispatch({type:ACTIONS.ADD_D,payload:{digit}}) } className="btn">{digit}</button>
    )
}

DigitButton.propTypes = {
    dispatch: PropTypes.func.isRequired,
    digit: PropTypes.string.isRequired
}