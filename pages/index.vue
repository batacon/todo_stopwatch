<template>
  <div class="issue-list">
    <h1>イシューリスト</h1>
    <ul class="todo-list">
      {{
        issues
      }}
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Issue, Todo } from '~/components/types'
import { todoRepository } from '~/repository/TodoRepository'

@Component
export default class TodoPage extends Vue {
  private newIssueTitle = ''
  private issues: Issue[] = []

  mounted() {
    // TODO: storeからissuesを取得してdataに設定する
    //
  }

  changeIssueTitle(todoId: number, newName: string) {
    const todo = this.todos.find((todo) => todo.id === todoId)
    if (todo) {
      todo.name = newName
    }
  }

  addNewIssue() {
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
