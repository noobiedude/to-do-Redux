const TO_DO_LIST_KEY = `todoList`;
const USER_KEY = `user`;

function setToDoList(todos){
    localStorage.setItem(TO_DO_LIST_KEY, JSON.stringify(todos));
}

function getToDoList(){
    const data = [];
    if (localStorage.getItem(TO_DO_LIST_KEY) != null && localStorage.getItem(TO_DO_LIST_KEY) !== `undefined`)
        return JSON.parse(localStorage.getItem(TO_DO_LIST_KEY));
    return data;
}

function setUser(user){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser(){
    const user = localStorage.getItem(USER_KEY);
    if (user != null && user !==`undefined`)
        return JSON.parse(user);
    else{
        deleteUser();
        const empty_obj = {isSignedIn: false};
        return empty_obj;
    }
}

function deleteUser(){
    localStorage.removeItem(USER_KEY);
}

function getNumCompletedToDos(){
    const todos = getToDoList();
    let completededToDos = 0;
    todos.filter(todo => todo.isCompleted ? completededToDos++ : ``);
    return completededToDos;
}

export { setToDoList, getToDoList, setUser, getUser, deleteUser, getNumCompletedToDos };