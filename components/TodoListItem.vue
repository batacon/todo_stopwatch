<template>
  <li
    :class="[
      'todo-list-item',
      { running: todo.isTimerRunning, done: todo.isDone },
    ]"
  >
    <input
      type="checkbox"
      :value="todoId"
      :checked="todo.isDone"
      @change="$emit('toggle-done', $event)"
    />
    <div class="todo-container">
      <div class="todo-name-container">
        <button
          v-show="!isEditingName"
          class="todo-name"
          @click="startEditingName"
        >
          {{ todo.name }}
        </button>
        <input
          v-show="isEditingName"
          :id="`todo-name-${todoId}`"
          type="text"
          required
          :value="todo.name"
          class="todo-name-input"
          @keydown.enter="changeTodoName($event.target.value, $event.keyCode)"
          @blur="changeTodoName($event.target.value)"
        />
        <div class="start-stop">
          <button
            v-if="!todo.isTimerRunning"
            @click="$emit('start-timer', todo)"
          >
            ▶︎
          </button>
          <button v-else @click="$emit('stop-timer', todo)">■︎</button>
        </div>
      </div>
      <time-display
        :todo="todo"
        @change-estimate-minutes="changeEstimateMinutes"
      />
    </div>
    <button class="remove-button" @click="$emit('remove-todo', todoId)">
      x
    </button>
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Todo } from '~/components/types'

@Component
export default class Index extends Vue {
  @Prop({ type: Object, required: true }) todo!: Todo
  private isEditingName = false

  get todoId(): number {
    return this.todo.id
  }

  startEditingName() {
    this.isEditingName = true
    this.$nextTick(() => {
      document.getElementById(`todo-name-${this.todoId}`)!.focus()
    })
  }

  changeTodoName(newName: string, keyCode?: number) {
    if (keyCode === 13 || keyCode === undefined) {
      this.isEditingName = false
      this.$emit('change-todo-name', this.todoId, newName)
    }
  }

  changeEstimateMinutes(todoId: number, estimateMinutes: number) {
    this.$emit('change-estimate-minutes', todoId, estimateMinutes)
  }
}
</script>

<style lang="postcss" scoped>
.todo-list-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;

  & .todo-name-container {
    display: flex;
    align-items: center;
  }

  & .start-stop {
    padding: 8px;
    margin-left: 20px;
    border: 1px solid #eee;
  }

  & .todo-name {
    font-size: 1.4rem;
    font-weight: bold;
  }

  & .todo-name-input {
    display: inline-block;
    width: 100%;
  }

  &.running {
    background-color: #eefff7;
  }

  &.done {
    background-color: #f7f7f7;
    opacity: 0.5;

    & .todo-name {
      text-decoration: line-through;
    }
  }

  & .todo-container {
    flex: 1;
    margin-right: 20px;
    margin-left: 16px;
  }

  & .remove-button {
    margin-left: auto;
    border: 1px solid #eee;
  }
}
</style>
