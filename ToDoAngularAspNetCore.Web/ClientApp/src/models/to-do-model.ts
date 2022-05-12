export class ToDoModel {
  id?: number;
  title: string;
  content: string;
  created: Date;
  isCompleted: boolean

  constructor(title: string, content: string, created: Date, isCompleted: boolean) {
    this.title = title;
    this.content = content;
    this.created = created;
    this.isCompleted = isCompleted;
  }
}
