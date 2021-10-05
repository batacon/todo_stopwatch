<template>
  <div class="todo-stopwatch">
    <button>イシュー一覧へ</button>
    <h1>
      <button v-show="!isEditingHeading" @click="startEditingHeading">
        {{ heading }}
      </button>
      <input
        v-show="isEditingHeading"
        id="heading"
        v-model="heading"
        type="text"
        required
        @keydown.enter="endEditingHeading"
        @blur="endEditingHeading"
      />
    </h1>
    <ul class="todo-list">
      <todo-list-item
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle-done="toggleDone"
        @start-timer="handleStartTimerButton"
        @stop-timer="stopTimer"
        @remove-todo="removeTodo"
        @change-todo-name="changeTodoName"
        @change-estimate-minutes="changeEstimateMinutes"
      />
    </ul>
    <form class="todo-form" @submit.prevent="addNewTodo">
      <input
        ref="newTodo"
        v-model="newTodoName"
        type="text"
        placeholder="Add new todo"
        required
      />
      <button type="submit">追加</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Todo } from '~/components/types'
import { todoRepository } from '~/repository/TodoRepository'

@Component
export default class TodoPage extends Vue {
  private heading = 'Todo Stopwatch'
  private isEditingHeading = false
  private newTodoName = ''
  private timer: any = undefined
  private todos: Todo[] = []

  get runningTodo(): Todo | undefined {
    return this.todos.find((todo) => todo.isTimerRunning) || undefined
  }

  mounted() {
    ;(this.$refs.newTodo as HTMLElement).focus()
    this.todos = todoRepository.load()
    addEventListener('beforeunload', this.saveTodos)
    const runningTodo = this.todos.find((todo) => todo.isTimerRunning)
    if (runningTodo) {
      this.startTimer(runningTodo)
    }
  }

  beforeDestroy() {
    removeEventListener('beforeunload', this.saveTodos)
  }

  startEditingHeading() {
    this.isEditingHeading = true
    this.$nextTick(() => {
      document.getElementById('heading')!.focus()
    })
  }

  endEditingHeading() {
    this.isEditingHeading = false
  }

  changeTodoName(todoId: number, newName: string) {
    const todo = this.todos.find((todo) => todo.id === todoId)
    if (todo) {
      todo.name = newName
    }
  }

  changeEstimateMinutes(todoId: number, newEstimateMinutes: number) {
    const todo = this.todos.find((todo) => todo.id === todoId)
    if (todo) {
      todo.estimateMinutes = newEstimateMinutes
    }
  }

  addNewTodo() {
    const lastTodo = this.todos[this.todos.length - 1]
    const id = lastTodo ? lastTodo.id + 1 : 1
    const newTodo = {
      id,
      name: this.newTodoName,
      isDone: false,
      estimateMinutes: 15,
      elapsedMinutes: 0,
      isTimerRunning: false,
      memo: '',
    }
    this.todos = [...this.todos, newTodo]
    this.newTodoName = ''
  }

  removeTodo(todoId: number) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId)
  }

  toggleDone(event: HTMLElementEvent<HTMLInputElement>) {
    const todoId = event.target.value
    this.todos.find((todo) => todo.id === +todoId)!.isDone =
      event.target.checked
  }

  saveTodos() {
    todoRepository.save(this.todos)
  }

  handleStartTimerButton(todo: Todo) {
    if (this.runningTodo) {
      alert(`${this.runningTodo.name}の最中じゃないですか？`)
      return
    }

    this.startTimer(todo)
  }

  startTimer(todo: Todo) {
    todo.isTimerRunning = true
    const startTime = Date.now()
    const elapsedTime = todo.elapsedMinutes
    this.timer = setInterval(() => {
      todo.elapsedMinutes =
        Math.floor(((Date.now() - startTime) * 0.001) / 60) + elapsedTime
    }, 100)
  }

  stopTimer(todo: Todo) {
    todo.isTimerRunning = false
    clearInterval(this.timer)
  }
}
</script>

<style lang="postcss" scoped>
.todo-stopwatch {
  margin: 0 16px;

  @media (min-width: 768px) {
    max-width: 1024px;
    margin: 0 auto;
  }

  & .todo-form {
    display: flex;

    & > input {
      flex: 1;
      margin-right: 16px;
    }
  }
}
</style>
