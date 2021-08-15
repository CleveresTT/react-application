import React, {useState} from 'react'
import ToDoListApp from './Todo/ToDoListApp'
import CalculatorApp from './Calculator/CalculatorApp'
import Modal from './Modal/Modal'

export const CalcContext = React.createContext()

function App(){
    const [calcState, setCalcState] = useState('none')
    const [toDoListState, setToDoListState] = useState('none')
    const [modalState, setModalState] = useState({
        modalStateAttr: 'none',
        content: ''
    })

    function toggleCalc(){
        if (toDoListState==='block')
            setToDoListState('none')

        if (calcState==='block')
            setCalcState('none')

        if (calcState==='none') {
            setModalState({modalStateAttr:'flex', content: 'Включен калькулятор'})
            setTimeout(()=>{
                if (calcState==='none')
                    setCalcState('block')
                setModalState({modalStateAttr:'none', content: ''})
            }, 1000)
        }
    }

    function toggleToDoList(){
        if (calcState==='block')
            setCalcState('none')

        if (toDoListState==='block')
            setToDoListState('none')

        if (toDoListState==='none') {
            setModalState({modalStateAttr:'flex', content: 'Включен список дел'})
            setTimeout(()=>{
                if (toDoListState==='none')
                    setToDoListState('block')
                    setModalState({modalStateAttr:'none', content: ''})
                }, 1000)}
            }
            
            return (
        <div>
            <Modal modalState={modalState}></Modal>
            <div className='appButtons'><button className='calcAppButton' onClick={toggleCalc}>Калькулятор</button><button className='toDoListAppButton' onClick={toggleToDoList}>Список дел</button></div>
            <hr></hr>
            <CalcContext.Provider value={calcState}>
                <CalculatorApp />
            </CalcContext.Provider>
            <ToDoListApp toDoListState={toDoListState} />
        </div>
    )
}

export default App