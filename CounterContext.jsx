import React,{createContext, useState}from "react"; 
export const CounterContext = createContext();
export const  CounterProvider =({c})=>{
  const [count, setCount] = useState(0);



const increment = ()=>
  setCount (count+1);

const decrement =()=>
  setCount (count-1);

const reset = ()=> 
  setCount(0);


return (
<CounterContext.Provider value={{ count, increment,decrement, reset}} >
  {c}

</CounterContext.Provider>

);

};