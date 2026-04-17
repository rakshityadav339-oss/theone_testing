// Simple TODO app using localStorage
(function(){
  const KEY = 'theone_todos_v1'
  const form = document.getElementById('todo-form')
  const input = document.getElementById('todo-input')
  const listEl = document.getElementById('todo-list')
  const remainingEl = document.getElementById('remaining')
  const clearBtn = document.getElementById('clear-completed')
  const resetBtn = document.getElementById('reset-all')

  let todos = load()

  function save(){
    localStorage.setItem(KEY, JSON.stringify(todos))
  }
  function load(){
    try{
      return JSON.parse(localStorage.getItem(KEY)) || []
    }catch(e){
      return []
    }
  }

  function render(){
    listEl.innerHTML = ''
    todos.forEach(todo => {
      const li = document.createElement('li')
      li.className = 'todo-item' + (todo.done? ' completed':'')

      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      checkbox.checked = !!todo.done
      checkbox.addEventListener('change', ()=>{
        todo.done = !!checkbox.checked
        save(); render();
      })

      const label = document.createElement('div')
      label.className = 'label'
      label.textContent = todo.text

      const meta = document.createElement('div')
      meta.className = 'meta'

      const editBtn = document.createElement('button')
      editBtn.title = 'Edit'
      editBtn.textContent = 'Edit'
      editBtn.addEventListener('click', ()=>{
        const val = prompt('Edit task', todo.text)
        if(val !== null){
          todo.text = val.trim() || todo.text
          save(); render();
        }
      })

      const delBtn = document.createElement('button')
      delBtn.title = 'Delete'
      delBtn.textContent = 'Delete'
      delBtn.addEventListener('click', ()=>{
        todos = todos.filter(t=>t.id !== todo.id)
        save(); render();
      })

      meta.appendChild(editBtn)
      meta.appendChild(delBtn)

      li.appendChild(checkbox)
      li.appendChild(label)
      li.appendChild(meta)
      listEl.appendChild(li)
    })

    const remaining = todos.filter(t=>!t.done).length
    remainingEl.textContent = remaining
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const text = input.value.trim()
    if(!text) return
    const todo = { id: Date.now() + Math.random(), text, done:false }
    todos.unshift(todo)
    save()
    input.value = ''
    render()
  })

  clearBtn.addEventListener('click', ()=>{
    todos = todos.filter(t=>!t.done)
    save(); render();
  })

  resetBtn.addEventListener('click', ()=>{
    if(confirm('Delete all todos?')){
      todos = []
      save(); render();
    }
  })

  // initial render
  render()
})()
