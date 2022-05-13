export class ToDoModel {
  id?: number;
  title: string;
  content: string;
  created: Date;
  isCompleted: boolean
  completedDate?: Date;

  constructor(title: string, content: string, created: Date, isCompleted: boolean, completedDate: Date | undefined) {
    this.title = title;
    this.content = content;
    this.created = created;
    this.isCompleted = isCompleted;
    this.completedDate = completedDate;
  }
}
