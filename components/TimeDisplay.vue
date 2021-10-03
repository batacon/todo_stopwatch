<template>
  <div class="time-display">
    {{ todo.elapsedMinutes }}分消費 /
    <button
      v-show="!isEditingEstimateMinutes"
      @click="startEditingEstimateMinutes"
    >
      {{ todo.estimateMinutes }}
    </button>
    <input
      v-show="isEditingEstimateMinutes"
      :id="`estimate-${todoId}`"
      type="number"
      min="1"
      max="60"
      step="1"
      required
      :value="todo.estimateMinutes"
      @keydown.enter="changeEstimateMinutes(+$event.target.value)"
      @blur="changeEstimateMinutes(+$event.target.value)"
    />
    分予定
    <span :class="{ 'time-over': isTimeOver }">
      予実差: {{ remainingMinutes }}分
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Todo } from './types'

@Component
export default class TimeDisplay extends Vue {
  @Prop({ type: Object, required: true }) todo!: Todo
  private isEditingEstimateMinutes = false

  get todoId(): number {
    return this.todo.id
  }

  get remainingMinutes(): number {
    return this.todo.estimateMinutes - this.todo.elapsedMinutes
  }

  get isTimeOver(): boolean {
    return this.remainingMinutes < 0
  }

  startEditingEstimateMinutes() {
    this.isEditingEstimateMinutes = true
    this.$nextTick(() => {
      // v-for+refsだとうまくいかない;(this.$refs.estimate as HTMLElement).focus()
      document.getElementById(`estimate-${this.todoId}`)!.focus()
    })
  }

  changeEstimateMinutes(estimateMinutes: string) {
    this.isEditingEstimateMinutes = false
    this.$emit('change-estimate-minutes', this.todoId, estimateMinutes)
  }
}
</script>

<style lang="postcss" scoped>
.time-display {
  display: inline;

  & button {
    padding: 11px;
  }

  & .time-over {
    color: red;
    font-weight: bold;
  }
}
</style>
