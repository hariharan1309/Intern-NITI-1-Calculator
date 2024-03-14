import { ACTIONS } from "./App"
import PropTypes from "prop-types"

export default function OpButton({Op,dispatch}){
    return (
        <button onClick={()=>dispatch({type:ACTIONS.CHOOSE,payload:{Op}})} className="btn">{Op}</button>
    )
}
OpButton.propTypes = {
    dispatch: PropTypes.func.isRequired,
    Op: PropTypes.string.isRequired
}