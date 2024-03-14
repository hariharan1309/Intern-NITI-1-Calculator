import { useReducer } from "react"
import DigitButton from "./DigitButton"
import OpButton from "./OpButton"
export const ACTIONS={
  ADD_D:"add",
  CLEAR:"clear",
  CHOOSE:"choose",
  DELETE_D:"delete",
  EVAL:"eval",
}

const NumbFormat=new Intl.NumberFormat(('en-US'),{
  maximumFractionDigits:0
})
function formatNumber(number){
  if(number==null) return ;
  const [inte,dec]=number.toString().split(".")
  if(dec==null) return NumbFormat.format(inte)
  return `${NumbFormat.format(inte)}.${dec}`
}
export default function App() {

  const reducer = (state, {type, payload}) => {

    switch (type) {
      case ACTIONS.ADD_D:
        if(state.overwrite){
          return {...state,curOp:payload.digit,overwrite:false}//if overwrite is true then return state with curOp as payload.digit and overwrite as false
        }
        if(payload.digit === "." && state.curOp.includes(".")) return state//if digit is . and curOp already includes . then return state
        if (payload.digit==='0' && state.curOp==='0') return state//if digit is 0 and curOp is 0 then return state
        return { ...state, curOp: `${state.curOp || ""}${ payload.digit }`// adding clicked button digit with existing curOp
    }
      case ACTIONS.CLEAR:
        return {}//clearing all the values
  
      case ACTIONS.CHOOSE:
        if(state.curOp == null && state.lastOp == null) return state//if curOp is empty then return state
        if(state.lastOp== null){ // for first element and ops
          return {...state,lastOp:state.curOp,curOp:null,Op:payload.Op}//if lastOp is empty then return state with lastOp as curOp and curOp as empty
        }
        if(state.curOp==null)//if curOp is empty then return state with Op as payload.Op
         { return {...state,Op:payload.Op,}}
        // if already has two elements and op
        return {...state,lastOp:eval(`${state.lastOp}${state.Op}${state.curOp}`),curOp:null,Op:payload.Op}//return state with lastOp as eval of state, curOp as empty and Op as payload.Op
        
      case ACTIONS.EVAL:
        if(state.curOp== null || state.lastOp==null || state.Op==null) return state//if curOp or lastOp or Op is empty then return state
        return {...state,overwrite:true,curOp:eval(`${state.lastOp}${state.Op}${state.curOp}`),lastOp:null,Op:null}//return state with lastOp as eval of state, curOp as empty and Op as payload.Op

      case ACTIONS.DELETE_D:
        if(state.overwrite)
        return {...state,curOp:null,overwrite:false}//if overwrite is true then return state with curOp as empty and overwrite as false
        if(state.curOp==null) return state//if curOp is empty then return state
        if(state.curOp.length===1) return {...state,curOp:null}//if curOp length is 1 then return state with curOp as empty
        return {state,curOp:state.curOp.slice(0,-1)}//return state with curOp as sliced from 0 to -1
      }
      

}

  const [{curOp,lastOp,Op},dispatch] = useReducer(reducer,{})//initial state empty object

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-center">Calculator</h1>
          <div className="cal-grid *:m-[1px] justify-center">
            <div className="output bg-slate-700 ">
              <div className="last-op">{formatNumber(lastOp)} {Op}</div>
              <div className="cur-op">{formatNumber(curOp)}</div>
            </div>
            <button className="span-two btn" onClick={()=> dispatch({type:ACTIONS.CLEAR})}>AC</button>
            <button className="btn" onClick={()=> dispatch({type:ACTIONS.DELETE_D})}>DEL</button>
            <OpButton Op="/" dispatch={dispatch} />

            {/* <button className="btn">%</button> */}
            <DigitButton dispatch={dispatch} digit="7" />
            <DigitButton dispatch={dispatch} digit="8" />
            <DigitButton dispatch={dispatch} digit="9" />
            <OpButton Op="x" dispatch={dispatch} />

            {/* <button className="btn">x</button> */}
            <DigitButton dispatch={dispatch} digit="4" />
            <DigitButton dispatch={dispatch} digit="5" />
            <DigitButton dispatch={dispatch} digit="6" />
             <OpButton Op="-" dispatch={dispatch} />

            {/* <button className="btn">-</button> */}
            <DigitButton dispatch={dispatch} digit="1" />
            <DigitButton dispatch={dispatch} digit="2" />
            <DigitButton dispatch={dispatch} digit="3" />
            <OpButton Op="+" dispatch={dispatch} />

            {/* <button className="btn">+</button> */}
            <DigitButton dispatch={dispatch} digit="." />
            <DigitButton dispatch={dispatch} digit="0" />
            <button className="span-two btn" onClick={()=>dispatch({type:ACTIONS.EVAL})}>=</button>
          </div>
      </div>
    </>
  )
}

