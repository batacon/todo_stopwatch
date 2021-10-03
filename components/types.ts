export interface Todo {
  id: number
  name: string
  isDone: boolean
  estimateMinutes: number
  elapsedMinutes: number
  isTimerRunning: boolean
  memo: string
}
