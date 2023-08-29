const todoForm = document.getElementById("todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let todos = [];
let isEditing = false;
let editingTodoID = "";

/**@function saveTodos
 * 1. todos 리스트에 있는 값을 JSON 문자열로 변환하여 localStorage에 저장
 */
const saveTodos = () => {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

/**@function deleteTodo
 * 1. id 값을 받아, todos 리스트에서 해당 id 값과 동일한 id를 가지고 있는 todo를 제거
 * 2. saveTodos 함수 실행(todos 리스트를 localStorage에 저장)
 * 3. todos 리스트에서 제거한 id 값의 todo를 화면에서도 제거
 */
const deleteTodo = (id) => {
  todos = todos.filter(todo => todo.id !== parseInt(id));
  saveTodos();

  document.getElementById(id).remove();
}

/**@function onEditTodo
 * 1. bool 타입의 전역 변수에 true를 대입함으로써 편집모드임을 표시
 * 2. id 값을 받아, 편집 중인 todo의 id 값을 넣는 전역 변수에 대입
 * 3. onTodoLoad 함수 실행(todo List를 하나씩 다시 화면에 그리기)
 * 4. 편집하는 input 요소를 추출
 * 5. 편집하는 input 요소의 글씨 길이를 변수에 대입
 * 6. 대입한 글씨 길이를 사용해서 마지막 부분 선택하고 focus 주기
 */
const onEditTodo = (id) => {
  isEditing = true;
  editingTodoID = id;

  onTodoLoad();

  const inputElement = document.querySelector("input[id^=id][type=text]");
  const valueLength = inputElement.value.length;

  inputElement.setSelectionRange(valueLength, valueLength);
  inputElement.focus();
}

/**@function updateTodo
 * 1. id 값을 받아, 해당 id랑 동일한 id를 가지고있는 todo의 text 수정하기
 * 2. saveTodos 함수 실행(todos 리스트를 localStorage에 저장)
 * 3. cancelEdit 함수 실행(편집모드 종료)
 */
const updateTodo = (id) => {
  todos = todos.map(todo => {
    if (todo.id === parseInt(id)) {
      return {
        ...todo,
        text: document.getElementById(`id_${id}`)?.value
      }
    } else {
      return todo;
    }
  })
  saveTodos();
  cancelEdit();
}

/**@function onEnterKeySubmit
 * 1. 키보드 이벤트로 Enter키를 감지
 * 2. Enter키의 기본 동작을 막고
 * 3. updateTodo 함수 실행(편집모드 input에서 입력한 todo로 수정하여 저장)
 */
const onEnterKeySubmit = (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    updateTodo((event.target.id).replace("id_", ""));
  }
}

/**@function cancelEdit
 * 1. bool 타입의 전역 변수에 false를 대입함으로써 편집모드가 끝났음을 표시
 * 2. 편집 중인 todo의 id 값을 넣는 전역 변수도 빈값으로 초기화
 * 3. onTodoLoad 함수 실행(todo List를 하나씩 다시 화면에 그리기)
 */
const cancelEdit = () => {
  isEditing = false;
  editingTodoID = null;
  onTodoLoad();
}

/**@function setComplete
 * 1. id 값을 받아, 해당 id랑 동일한 id를 가지고있는 todo의 isComplete 수정하기
 * 2. saveTodos 함수 실행(todos 리스트를 localStorage에 저장)
 * 3. cancelEdit 함수 실행(편집모드 종료)
 */
const setComplete = (id) => {
  todos = todos.map(todo => {
    if (todo.id === parseInt(id)) {
      return {
        ...todo,
        isComplete: !todo.isComplete
      };
    } else {
      return todo;
    }
  })

  saveTodos();
  onTodoLoad();
}

/**@function paintTodo
 * 1. li 요소 생성
 * 2. ul(todoList) 요소의 자식으로 li 위치시키기
 * 3. li 요소의 id로 전달 받은 todo(newTodoObj)의 id 대입
 * 4. 전달받은 todo(newTodoObj)의 id가 편집 중인 id의 값과 동일한지 확인
 * 5. 동일하지 않다면 체크박스, todo text, 편집&삭제 버튼을 화면에 표출
 * 6. 동일하다면 편집모드 input, 완료&취소 버튼을 화면에 표출
 */
const paintTodo = (newTodoObj) => {
  const li = document.createElement("li");

  todoList.appendChild(li);

  li.id = newTodoObj.id;
  
  if (newTodoObj.id !== editingTodoID) {
    li.innerHTML = `
      <input
        type="checkbox"
        id="id_${newTodoObj.id}"
        class="todo-checkbox"
        onClick="setComplete(${newTodoObj.id})"
        ${newTodoObj.isComplete && "checked"}
      />
      <label
        for="id_${newTodoObj.id}"
        class="todo-text"
        ${newTodoObj.isComplete ? "style=text-decoration:line-through" : null}
      >
        ${newTodoObj.text}
      </label>
      <div>
        <button onClick="onEditTodo(${newTodoObj.id})">
          edit
        </button>
        <button onClick="deleteTodo(${newTodoObj.id})">
          ✖
        </button>
      </div>
    `;
  } else {
    li.innerHTML = `
      <input
        required
        type="text"
        id="id_${newTodoObj.id}"
        value="${newTodoObj.text}"
        class="edit-input"
      />
      <div>
        <button onClick="updateTodo(${newTodoObj.id})">
          ✔
        </button>
        <button onClick="cancelEdit()">
          ✖
        </button>
      </div>
    `;
  }
}

/**@function onTodoSubmit
 * 1. form submit감지 시 실행되는 기본 동작(페이지 새로고침) 막기
 * 2. 사용자가 입력한 todo input의 값을 변수에 대입하고 input은 빈 값으로 초기화
 * 3. 객체 변수의 text는 변수에 담아둔 todo 값을 대입하고 id는 현재 Date로 isComplete은 false로 대입
 * 4. 다 대입된 객체 변수를 todos 리스트에 push
 * 5. paintTodo 함수 실행(todo를 화면에 표출)
 * 6. saveTodos 함수 실행(todos 리스트를 localStorage에 저장)
 */
const onTodoSubmit = (event) => {
  event.preventDefault();

  const newTodo = todoInput.value;
  todoInput.value = "";

  const newTodoObj = {
    id: Date.now(),
    text: newTodo,
    isComplete: false,
  };

  todos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodos();
}

/**@function onTodoLoad
 * 1. localStorage에 저장되어 있는 todo들을 가져오고
 * 2. ul(todoList)에 있는 innerHTML들을 빈 값으로 초기화 (편집 버튼을 눌렀을 때 이중으로 생기는 것을 방지)
 * 3. localStorage에 todo들이 저장되어 있는지 확인 후 JSON 문자열을 JavaScript의 객체로 변환하여 todos 리스트에 대입
 * 4. todos 리스트의 수만큼 paintTodo 함수 실행(todo를 화면에 표출)
 * 5. 편집하는 input 요소를 추출하고 키보드 이벤트 리스너 추가
 */
const onTodoLoad = () => {
  const savedTodos = localStorage.getItem(TODOS_KEY);
  todoList.innerHTML = '';
  
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
    
    todos.forEach(paintTodo);
  }
  
  const editInput = document.querySelector("input[id^=id][type=text]");
  editInput?.addEventListener("keypress", onEnterKeySubmit);
}

todoForm.addEventListener("submit", onTodoSubmit);
window.onload = onTodoLoad;
