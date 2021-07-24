import React, {useState, useEffect} from 'react'

function Hooks(){
    const [type, setType] = useState('users')
    const [data, setData] = useState([])
    const [pos, setPos] = useState({
        x:0, y:0
    })
    
    const mouseMoveHandler = event => {
        setPos({
        x: event.clientX,
        y: event.clientY})
    }
    

    useEffect(()=>{
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then(response => response.json())
            .then(json => setData(json))

        console.log('clean listener') //удаление слушателя при удалении компонента
    }, [type])

    useEffect(()=>{
        window.addEventListener('mousemove', mouseMoveHandler, [])
        return ()=>{window.removeEventListener('mousemove', mouseMoveHandler, [])}
    })

    return(
        <div>  
           <h1>Ресурс: {type}</h1>
           <button onClick={() => {setType('users')}}>Пользователи</button>
           <button onClick={() => {setType('todos')}}>Todos</button>
           <button onClick={() => {setType('posts')}}>Посты</button>

           {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
           <pre>{JSON.stringify(pos, null, 2)}</pre>
        </div>
    )
}

export default Hooks