import React, {useState, useEffect, useRef, useMemo} from 'react'

function complexComputed(num){
    let i=0
    while(i<1000000000) i++
    return num*2
}

function Hooks(){
    const [number, setNumber] = useState(42)
    const [colored, setColored] = useState(false)

    const styles = useMemo(()=>{
        return {color: colored ? 'darkred' : 'black'}
    }, [colored])

    const computed = useMemo(()=>{
        return complexComputed(number)
    }, [number])

    useEffect(()=>{
        console.log('Styles changed')
    },[styles])

    return(
        <div>  
            <h1 style={styles}>Вычисляемое свойство: {computed}</h1>
            <button onClick={()=>setNumber(prev => prev + 1)}>Добавить</button>
            <button onClick={()=>setNumber(prev => prev - 1)}>Убрать</button>
            <button onClick={()=>setColored(prev => !prev)}>Изменить</button>
        </div>
    )
}

export default Hooks