//adds new item to the beginning
export const addTodo = (list, item) => [item, ...list];
export const generateId = () => Math.floor(Math.random()*100000);
export const findById = (id, list) => list.find(item => item.id === id);
export const toggleTodo = (todo) => ({...todo, isComplete: !todo.isComplete});
export const updateTodo = (list, todo) => {
    const todoIndex = list.findIndex(item => item.id === todo.id)
    return [
        ...list.slice(0,todoIndex),
        todo,
        ...list.slice(todoIndex+1)
    ]
};
export const removeTodo = (list, idNum) => {
    const removeIndex = list.findIndex(item => item.id === idNum)
    return ([
        ...list.slice(0,removeIndex),
        ...list.slice(removeIndex+1)
    ])
}