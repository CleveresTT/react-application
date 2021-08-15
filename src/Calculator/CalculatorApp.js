import React, {useEffect, useState, useContext} from 'react'
import { CalcContext } from '../App'

function CalculatorApp(){
    const calcState = useContext(CalcContext)

    const calcStyles = {
        display: calcState
    }

    const [result, setResult] = useState('')
    const [colored, setColored] = useState('black')

    function useInputValue(defaultValue=''){
        const [value, setValue] = useState(defaultValue)

        useEffect(()=>{
            try {
                setResult(Compute(input.value()))
                setColored('lightgray')
            } catch {
                setResult('error')
            }
        }, [value])
    
        return{
            bind:{
                className: 'in',
                id: 'in',
                value,
                onChange: event => { 
                    if (event.nativeEvent.data>=0 || 
                        event.nativeEvent.data<=9 || 
                        event.nativeEvent.data==='.' || 
                        event.nativeEvent.data==='+' || 
                        event.nativeEvent.data==='*' || 
                        event.nativeEvent.data==='-' || 
                        event.nativeEvent.data==='/' || 
                        event.nativeEvent.data==='=' || 
                        event.nativeEvent.inputType==='deleteContentBackward')
                           setValue(event.target.value)
                    else {}
                }
            },
            clear: () => setValue(''),
            backspace: () => {setValue(value.substring(0, value.length - 1))},
            value: () => value,
            addChar: (char) => {setValue(value+char)},
        }
    }

    const input = useInputValue('')

    document.addEventListener('keydown', event => {
        if ((event.key).match(/Enter/)) calc(event.key);
    });

    function Pr(ch){
        if(ch==='+') return 1;
        if(ch==='-') return 1;
        if(ch==='*') return 2;
        if(ch==='/') return 2;
    }

    function Compute(textContent){
        let num=[];
        let S=[];
        let res=[];
        let size=textContent.length;
        let hasPoint = false;
        let firstChar = true;
        for(let i=0;i<size;i++){
            let ch=textContent[i];
            if (ch==='(') S.push(ch);
            else if (ch===')'){
                while (S[S.length - 1]!=='('){
                    switch (S[S.length - 1]) {
                        case '+':
                            res[res.length-2]=res[res.length-2]+res[res.length-1];
                            res.pop();
                            break;
                        case '-':
                            res[res.length-2]=res[res.length-2]-res[res.length-1];
                            res.pop();
                            break;
                        case '*':
                            res[res.length-2]=res[res.length-2]*res[res.length-1];
                            res.pop();
                            break;
                        case '/':
                            res[res.length-2]=res[res.length-2]/res[res.length-1];
                            res.pop();
                            break;
                        default:
                            throw new Error('Compute error')
                    }
                    S.pop();
                }
                ch=S[S.length - 1];
                S.pop();
            }
            else if (ch==='+' || ch==='-' || ch==='*' || ch==='/'){
                if(S.length===0) S.push(ch);
                else{
                    if (S[S.length - 1]==='+' || S[S.length - 1]==='-' || S[S.length - 1]==='*' || S[S.length - 1]==='/'){
                        if(Pr(ch)>Pr(S[S.length - 1])) S.push(ch);
                        else{
                            switch (S[S.length - 1]) {
                                case '+':
                                    res[res.length-2]=res[res.length-2]+res[res.length-1];
                                    res.pop();
                                    break;
                                case '-':
                                    res[res.length-2]=res[res.length-2]-res[res.length-1];
                                    res.pop();
                                    break;
                                case '*':
                                    res[res.length-2]=res[res.length-2]*res[res.length-1];
                                    res.pop();
                                    break;
                                case '/':
                                    res[res.length-2]=res[res.length-2]/res[res.length-1];
                                    res.pop();
                                    break;
                                default:
                                    throw new Error('Compute error')
                            }
                            S.pop();
                            S.push(ch);
                        }
                    }
                    else S.push(ch);
                }
            }
            else if((ch>='0' && ch<='9')||ch==='.'){
                hasPoint = false;
                firstChar = true;
                while((ch>='0' && ch<='9')||ch==='.'){
                    if(ch==='.'){
                        if (firstChar===true) throw new Error('Compute error')
                        if (hasPoint===true) throw new Error('Compute error')
                        hasPoint=true;
                    }
                    num.push(ch);
                    i++;
                    ch=textContent[i];
                    firstChar=false;
                }
                i--;
                num=num.join('');
                res.push(Number(num));
                num=[];
            }
        }
        while(S.length!==0){
            switch (S[0]) {
                case '+':
                    res[1]=res[0]+res[1];
                    res.reverse();
                    res.pop();
                    res.reverse();
                    break;
                case '-':
                    res[1]=res[0]-res[1];
                    res.reverse();
                    res.pop();
                    res.reverse();
                    break;
                case '*':
                    res[1]=res[0]*res[1];
                    res.reverse();
                    res.pop();
                    res.reverse();
                    break;
                case '/':
                    res[1]=res[0]/res[1];
                    res.reverse();
                    res.pop();
                    res.reverse();
                    break;
                default:
                    throw new Error('Compute error')
            }
            S.reverse();
            S.pop();
            S.reverse();
        }
        if (!res[0]) return ('')
        return(Number(res[0].toFixed(8)));
    }

    function calc(value) {
        if (value.match(/=|Enter/)) {
            try {
                setResult(Compute(input.value()))
                setColored('black')
            } catch {
                setResult('error')
            }
        } else if (value === 'C') {
            input.clear();
        } else if (value.match(/CE/)) {
            input.backspace();
        } else {
            input.addChar(value);
        }
    }



    return (
        <div className="calc" style={calcStyles}>
            <input {...input.bind}></input>
            <span>
                <output style={{color: colored}}>{result}</output><button onClick={() => setResult('')} onMouseDown={e => e.preventDefault()}>Clear</button>
            </span>
            <div className="buttonsGrid">
                <button onClick={() => calc('(')} onMouseDown={e => e.preventDefault()}>(</button><button onClick={() => calc(')')} onMouseDown={e => e.preventDefault()}>)</button><button onClick={() => calc('C')} onMouseDown={e => e.preventDefault()}>C</button><button onClick={() => calc('CE')} onMouseDown={e => e.preventDefault()}>CE</button>
                <button onClick={() => calc('+')} onMouseDown={e => e.preventDefault()}>+</button><button onClick={() => calc('7')} onMouseDown={e => e.preventDefault()}>7</button><button onClick={() => calc('8')} onMouseDown={e => e.preventDefault()}>8</button><button onClick={() => calc('9')} onMouseDown={e => e.preventDefault()}>9</button>
                <button onClick={() => calc('-')} onMouseDown={e => e.preventDefault()}>-</button><button onClick={() => calc('4')} onMouseDown={e => e.preventDefault()}>4</button><button onClick={() => calc('5')} onMouseDown={e => e.preventDefault()}>5</button><button onClick={() => calc('6')} onMouseDown={e => e.preventDefault()}>6</button>
                <button onClick={() => calc('*')} onMouseDown={e => e.preventDefault()}>*</button><button onClick={() => calc('1')} onMouseDown={e => e.preventDefault()}>1</button><button onClick={() => calc('2')} onMouseDown={e => e.preventDefault()}>2</button><button onClick={() => calc('3')} onMouseDown={e => e.preventDefault()}>3</button>
                <button onClick={() => calc('/')} onMouseDown={e => e.preventDefault()}>/</button><button onClick={() => calc('0')} onMouseDown={e => e.preventDefault()}>0</button><button onClick={() => calc('.')} onMouseDown={e => e.preventDefault()}>.</button><button onClick={() => calc('=')} onMouseDown={e => e.preventDefault()}>=</button>
            </div>
        </div>
    )
}

export default CalculatorApp