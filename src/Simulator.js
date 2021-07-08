import React, { useState } from 'react';

function Simulator(simulator,setSimulator,fetch,setFetch,result,setResult){
    if(simulator===0)
        return Vertexes(setSimulator,setFetch)
    else if (simulator>0&&fetch===0)
        return Weights(simulator,setSimulator,setFetch,setResult)
    else
        return Results(setFetch,result);
}

function WeightsTable(vertexes){
    let table=[]
    table.push(<tr>{WeightsHeaderRow(vertexes)}</tr>)
    let i
    for(i=0;i<vertexes;i++){
        table.push(<tr>{WeightsRow(vertexes,i)}</tr>)
    }
    return table
}

function WeightsHeaderRow(vertexes){
    let row=[]
    row.push(<td></td>)
    let j
    for(j=0;j<vertexes;j++){
        row.push(<th>{j}</th>)
    }
    return row;
}

function WeightsRow(vertexes,i){
    let row=[]
    row.push(<th>{i}</th>)
    let j
    for(j=0;j<vertexes;j++){
        let id='id'+i+'_'+j
        row.push(<td><input type="number" id={id} name={id} min="0" max="10" defaultValue="0" /></td>)
    }
    return row;
}

function getResults(vertexes,setResult){

    let source=document.querySelector('#source').value
    let table=[]
    let i,j
    for(i=0;i<vertexes;i++){
        let row= []
        for(j=0;j<vertexes;j++){
            let query='#id'+i+'_'+j

            row.push(document.querySelector(query).value)
        }
        table.push(row)
    }

    fetch(' https://cors-everywhere.herokuapp.com/http://dijkstrabackenv-env.eba-ikrw47ps.us-east-2.elasticbeanstalk.com/',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                table:table,
                source:source
            })
        }
    )
        .then((response) => {return response.json()})
        .then((responseData) => {return responseData})
        .then((data) => {setResult(data)})
        .catch((err) => {console.log(err)})
}

function DRow(result){
    let row=[]

    row.push(<th>d</th>);
    let i
    for(i=0;i<result.d.length-1;i++){
        row.push(<td>{result.d[i]}</td>);
    }
    row.push(<td>{result.d[i]}</td>);
    return row
}

function PRow(result){
    let row=[]

    row.push(<th>p</th>);
    let i
    for(i=0;i<result.p.length-1;i++){
        row.push(<td>{result.p[i]}</td>);
    }
    row.push(<td>{result.p[i]}</td>);
    return row
}

function ResultsHeaderRow(result){
    let row=[]

    row.push(<th>vertex</th>);
    let i
    for(i=0;i<result.p.length;i++){
        row.push(<th>{i}</th>);
    }
    return row
}

function ResultsTable(result){
    let table=[]
    if(result===0){
        table.push('fetching...')
    }
    else{
        table.push(<tr>{ResultsHeaderRow(result)}</tr>)
        table.push(<tr>{DRow(result)}</tr>)
        table.push(<tr>{PRow(result)}</tr>)
    }
    return table
}

function Weights(simulator,setSimulator,setFetch,setResult){
    let i
    return(
        <div className='Content'>
            Please choose graph's weights (case there isn't edge -> choose 0).
            <br/>
            <br/>
            <table>{WeightsTable(simulator)}</table>
            <br/>
            Source :
            <br/>
            <input type="number" id="source" name="source" min="0" max={simulator-1} defaultValue="0" />
            <br/>
            <br/>
            <button onClick={()=>setSimulator(0)}>back</button>
            <br/>
            <button onClick={()=>{
                getResults(simulator,setResult)
                setFetch(1)
            }}>run</button>
        </div>
    );
}

function Results(setFetch,result){
    return(
        <div className='Content'>
            Results :
            <br/>
            <br/>
            <table>{ResultsTable(result)}</table>
            <br/>
            <button onClick={()=>setFetch(0)}>back</button>
        </div>
    );
}

function Vertexes(setSimulator){
    return(
        <div className='Content'>
            Please choose how much vertexes you want . <br/>
            <br/>
            <input type="number" id="vertexes" name="vertexes" min="2" max="9" defaultValue="2" />
            <br/>
            <br/>
            <button onClick={()=>setSimulator(document.querySelector('#vertexes').value)}>next</button>
        </div>
    );
}

export default Simulator;
