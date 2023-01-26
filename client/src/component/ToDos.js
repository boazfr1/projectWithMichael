// import { userInfo } from "os";
import { useContext, useEffect, useState } from "react";
import { userInfoContext } from "./userInfoContext";


function ToDos() {

    let [toDoArray, setToDoArray] = useState([]);
    let [sortBy, setSortBy] = useState('id')
    useEffect(() => {
        fetchToDos()
        // return ()=>{postTodos()}//unmount
    }, [])
    useEffect(() => {
        console.log(sortBy);
        sortData(toDoArray)
    }, [sortBy])

    window.addEventListener('beforeunload', postTodos)
    // useEffect(() => {
    //     sortData(toDoArray)
    // }, [toDoArray])

    let userInfo = useContext(userInfoContext)
    async function fetchToDos() {
        // if (localStorage.getItem('toDos') === null || localStorage.getItem('toDos') === undefined) {
        // const userId = JSON.parse(localStorage.getItem('currentUser')).id
        let res = await fetch(`http://localhost:3002/todos/${userInfo.myInfo.id}`);
        let toDos = await res.json();
        console.log(toDos);
        // localStorage.setItem('toDos', JSON.stringify(toDos))
        setToDoArray(toDos);
        console.log(toDoArray);
        // }
        // else {
        // let toDos = JSON.parse(localStorage.getItem('toDos'))
        // setToDoArray(toDos);
        // }
    };
    let toggleCheckBox = (i) => {
        let toDos = [...toDoArray]
        toDos[i].completed = !toDos[i].completed
        setToDoArray(toDos)
        console.log(i);
        // localStorage.setItem('toDos', JSON.stringify(toDoArray))
    }
        
    
    function changeSortBy(e) {
        setSortBy(() => `${e.target.value}`)
        console.log(sortBy);
        console.log(e.target.value);

    }

    function sortData(arr) {
        arr.sort((a, b) => {
            return ((a[sortBy] || Math.random()) < (b[sortBy] || Math.random())) ? -1 : 1;
        });
    }
    function postTodos() {
        console.log('userInfo.myInfo.id: ', userInfo.myInfo.id);
        fetch(`http://localhost:3002/todos/${userInfo.myInfo.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toDoArray)
            
        })
    }
    return (
        <div>
            <button onClick={postTodos}>onrefresh</button>
            <label>Sort By:</label>
            <select value={sortBy} onChange={changeSortBy} name='sort'>
                <option value="id">ID</option>
                <option value="completed">Completed</option>
                <option value="title">Title</option>
                <option value="random">Random</option>
            </select>
            {console.log('toDoArray;', toDoArray)}
            {toDoArray.map((toDo, i) => (
                <div key={i}>{toDo.id + ": "}
                    <label>{toDo.title}
                        <input type='checkbox' value={toDo.title} checked={toDo.completed} onChange={() => toggleCheckBox(i)} />
                    </label>
                    <hr />
                </div>
            ))}
        </div>
    )
}


export default ToDos
