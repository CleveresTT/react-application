import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react'
import ItemsList from './itemsList'


function Hooks(){
    const [count, setCount] = useState(1)
    const [colored, setColored] = useState(false)

    const styles = {color: colored ? 'darkred' : 'black'}

    const genereteItemsFromAPI = useCallback(function(index){
        return new Array(count).fill('').map((_,i) => `Элемент: ${i+index}`)
    }, [count])

    return(
        <div>  
            <h1 style={styles}>Количество элементов: {count}</h1>
            <button onClick={()=>setCount(prev => prev + 1)}>Добавить</button>
            <button onClick={()=>setColored(prev => !prev)}>Изменить</button>

            <ItemsList getItems={genereteItemsFromAPI}></ItemsList>
        </div>
    )
}

export default Hooks