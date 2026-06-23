const todoInput = document.getElementById("todoInput")
const addBtn = document.getElementById("addBtn")
const todoList = document.getElementById("todoList")
const remainingCount = document.getElementById("remainingCount")
const totalCount = document.getElementById("totalCount")

// 상태를 메모리에만 저장(새로고침하면 사라짐)
const todos = []

function render() {
    todoList.innerHTML = ""
    // [{text:"아침식사", done=false}, {text:"운동하기", done=false}, ...]
    // {text:"아침식사", done=false}
    todos.forEach((todo, index) => {
        const li = document.createElement("li") // <li></li>
        if (todo.done) li.classList.add("done") // <li class=done></li>

        const left = document.createElement("div")
        left.className = "left"
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = todo.done

        checkbox.addEventListener("change", ()=>{
            todo.done = checkbox.checked
            render()
        })

        const text = document.createElement("span")
        text.className = "todo-text"
        text.textContent = todo.text

        const delBtn = document.createElement("button")
        delBtn.type = "button"
        delBtn.className = "delete-btn"
        delBtn.textContent = "삭제"
        delBtn.addEventListener("click", () => {
            todos.splice(index, 1)
            render()
        })

        left.appendChild(checkbox)
        left.appendChild(text)
        left.appendChild(delBtn)

        li.appendChild(left)
        todoList.appendChild(li)

        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "삭제"
        deleteBtn.className = "delete-btn"
        deleteBtn.addEventListener("click", () => {
            todos.splice(index, 1)
            render()
        })

        

    })

}
function updateCounts() {
    const total = todos.length
    const remaining = todos.filter((t) => !t.done). length
    remainingCount.textContent = String(remaining)
    totalCount.textContent = String(total)
}


function addTodo() {
    const text = todoInput.value.trim()
    if(!text) return
    todos.push({ text, done: false })
    todoInput.value = ""
    todoInput.focus()
    // 화면 그리기
    render()
}

addBtn.addEventListener("click", addTodo)

todoInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter") addTodo()
})

render()