import React, {useState, useEffect, useRef} from 'react'

////let renderCount = 1

function Hooks(){
    //const [renderCount, setRenderCount] = useState(1)
    const [value, setValue] = useState('initial')
    const renderCount = useRef(1)
    const inputRef = useRef(null)
    const prevValue = useRef('')

    useEffect(()=>{ //сохранение промежуточного значения между рендерами
        //setRenderCount(prev=>prev+1)
        renderCount.current++
        console.log(inputRef.current.value)
    })

    function focus(){ //доступ к ДОМ-элементу
        inputRef.current.focus()
    }

    useEffect(()=>{ 
        prevValue.current=value
    }, [value])

    return(
        <div>  
            <h1>Количество рендеров: {renderCount.current}</h1>
            <h1>Предыдущее состояние: {prevValue.current}</h1>
            <input ref={inputRef} onChange={event=>{setValue(event.target.value)}} value={value}></input>
            <button onClick={focus}>Фокус</button>
        </div>
    )
}

export default Hooks