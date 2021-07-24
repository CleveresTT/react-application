import React, {useState} from 'react'

function Hooks(){

    function ComputeInitalCounter(){
        console.log('computation...')
        return Math.trunc(Math.random()*10)
    }

    //const [counter, setCounter] = useState(ComputeInitalCounter());
    const [counter, setCounter] = useState(() => {return ComputeInitalCounter()});

    const [state, setState] = useState({
        title: 'счетчик',
        date: Date.now()
    })

    function inc(){
        //setCounter(counter+1) 
        //setCounter(counter+1) 
        setCounter((prevCounter) => {
            return prevCounter+1
        })
        //setCounter(prev => prev+1)
    }

    function dec(){
        setCounter(counter-1) 
    }

    function update(){
        //setState({title: 'Новое название'})
        setState(prev => {
            return {...prev,
            title: 'Новое название'}
        })
    }

    return(
        <div>  
            <h1>Счетчик: {counter}</h1>
            <button onClick={inc}>Добавить</button>
            <button onClick={dec}>Удалить</button>
            <button onClick={update}>Изменить название</button>

            <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
    )
}

export default Hooks