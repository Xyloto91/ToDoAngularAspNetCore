export class ToDoModel {
  id?: number;
  userId: number;
  title: string;
  content: string;
  created: Date;
  isCompleted: boolean
  completedDate?: Date;

  constructor(userId: number, title: string, content: string, created: Date, isCompleted: boolean, completedDate: Date | undefined) {
    this.userId = userId;
    this.title = title;
    this.content = content;
    this.created = created;
    this.isCompleted = isCompleted;
    this.completedDate = completedDate;
  }
}
