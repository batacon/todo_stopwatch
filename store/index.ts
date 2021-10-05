import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { Issue, Todo } from '~/components/types'

@Module({
  name: 'issue',
  stateFactory: true,
  namespaced: true,
})
export default class IssueStore extends VuexModule {
  issues: Issue[] = []

  get todosOfIssue(): (issueId: number) => Todo[] {
    return (issueId: number) => {
      return this.issues.find(issue => issue.id === issueId)?.todos || []
    }
  }

  @Mutation
  addIssue(issue: Issue) {
    this.issues = [...this.issues, issue]
  }

  @Mutation
  removeIssue(issueId: number) {
    this.issues = this.issues.filter(issue => issue.id !== issueId)
  }

  @Mutation
  addTodo(issueId: number, todo: Todo) {
    const issue = this.issues.find(issue => issue.id === issueId)
    if (issue) {
      issue.todos = [...issue.todos, todo]
    }
  }

  @Mutation
  removeTodo(issueId: number, todoId: number) {
    const issue = this.issues.find(issue => issue.id === issueId)
    if (issue) {
      issue.todos = issue.todos.filter(todo => todo.id !== todoId)
    }
  }
}
