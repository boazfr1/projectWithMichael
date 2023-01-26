import { useContext, useEffect, useState } from "react";
import { userInfoContext } from "./userInfoContext";

function ToDos() {

    let [toDoArray, setToDoArray] = useState([]);
    let [sortBy, setSortBy] = useState('id')
    useEffect(() => {
        fetchToDos()
    }, [])
    useEffect(() => {
        console.log(sortBy);
        sortData(toDoArray)
    }, [sortBy])

    window.addEventListener('beforeunload', postTodos)

    let userInfo = useContext(userInfoContext)
    async function fetchToDos() {
        let res = await fetch(`http://localhost:3002/todos/${userInfo.myInfo.id}`);
        let toDos = await res.json();
        setToDoArray(toDos);
    };
    let toggleCheckBox = (i) => {
        let toDos = [...toDoArray]
        toDos[i].completed = !toDos[i].completed
        setToDoArray(toDos)
        console.log(i);
    }

    function changeSortBy(e) {
        setSortBy(() => `${e.target.value}`)
    }

    function sortData(arr) {
        arr.sort((a, b) => {
            return ((a[sortBy] || Math.random()) < (b[sortBy] || Math.random())) ? -1 : 1;
        });
    }
    function postTodos() {
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
