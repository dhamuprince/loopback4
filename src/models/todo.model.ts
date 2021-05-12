import {Entity, model, property, belongsTo} from '@loopback/repository';
// import {TodoList} from './todo-list.model';
// add TodoListWithRelations to the following import
import {TodoList, TodoListWithRelations} from './todo-list.model';
@model()
export class Todo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  desc?: string;

  @property({
    type: 'boolean',
  })
  isComplete?: boolean;

  @belongsTo(() => TodoList, {name: 'todolistfromtodo'})
  todoListId: number;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // describe navigational properties here
  // add the following line
  todoList?: TodoListWithRelations;
}

export type TodoWithRelations = Todo & TodoRelations;
