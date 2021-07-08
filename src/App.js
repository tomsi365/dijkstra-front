import './App.css';
import React, { useState } from 'react';
import Simulator from "./Simulator";

function Home(){
    return (
        <div className='Content'>
            Welcome to my personal Dijkstra's Algorithm project .
            <br/>
            As a part of my academic studies ,
            <br/>
            I was asked to build a project about Dijkstra's Algorithm .
        </div>
    );
}

function Algorithm(){
    return(
        <div className='Content'>
            Dijkstra(Graph, source): <br/>
            <br/>
            &nbsp;&nbsp;d[source] = 0 <br/>
            &nbsp;&nbsp;create vertex priority queue Q <br/>
            <br/>
            &nbsp;&nbsp;for each vertex v in Graph: <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;if v != source <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d[v] = INFINITY <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;p[v] = UNDEFINED <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Q.add(v, d[v]) <br/>
            <br/>
            &nbsp;&nbsp;while Q is not empty: <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;u = Q.deleteMin() <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;for each neighbor v of u: <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;alt = d[u] + length(u, v) <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if alt &#60; d[v] <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d[v] = alt <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;p[v] = u <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Q.decreaseKey(v, alt) <br/>
            <br/>
            &nbsp;&nbsp;return d , p <br/>
            <br/>
            ** assumed that graph's weights are positive <br/>
        </div>
    );
}

function NavigationBar(props){
    let setContent=props.setContent
    return(
        <ul className="Navigation-Bar">
            <li><button onClick={()=>setContent(0)}>Home</button></li>
            <li><button onClick={()=>setContent(1)}>Algorithm</button></li>
            <li><button onClick={()=>setContent(2)}>Simulator</button></li>
        </ul>
    );
}

function Content(props){
    let content=props.content
    if(content===0)
        return Home()
    else if(content===1)
        return Algorithm()
    else
        return Simulator(props.simulator,props.setSimulator,props.fetch,props.setFetch,props.result,props.setResult)
}

function App() {
    const [content,setContent] = useState(0);
    const [simulator,setSimulator] = useState(0);
    const [fetch,setFetch] = useState(0);
    const [result,setResult] = useState(0);
    return (
        <div className="App">
            <NavigationBar setContent={setContent}/>
            <Content
                fetch={fetch} setFetch={setFetch}
                simulator={simulator} setSimulator={setSimulator}
                result={result} setResult={setResult}
                content={content}/>
        </div>
    );
}

export default App;
