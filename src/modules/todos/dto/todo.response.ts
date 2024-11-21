export class TodoResponseDto {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  date: Date;

  constructor(todoDocument) {
    this.id = todoDocument._id;
    this.title = todoDocument.title;
    this.description = todoDocument.description;
    this.completed = todoDocument.completed;
    this.date = todoDocument.date;
  }
}
