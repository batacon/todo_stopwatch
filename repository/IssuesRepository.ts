import { Issue } from "~/components/types";

const initialIssue: Issue = {
  id: 1,
  title: 'Learn Vue',
  isDone: false,
  description: '',
  todos: [
    {
      id: 1,
      name: 'Learn Vue',
      isDone: false,
      estimateMinutes: 10,
      elapsedMinutes: 0,
      isTimerRunning: false,
      memo: '',
    }
  ]
}

export default class IssuesRepository {
  public save(issues: Issue[]): void {
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  public load(): Issue[] {
    const issues = localStorage.getItem('issues');
    return issues ? JSON.parse(issues) : [initialIssue];
  }
}

export const issuesRepository = new IssuesRepository();
