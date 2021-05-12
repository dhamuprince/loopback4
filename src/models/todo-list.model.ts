import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
// import {Todo} from './todo.model';
// add TodoWithRelations to the following import
import {Todo, TodoWithRelations} from './todo.model';
import {TodoListImage,TodoListImageWithRelations} from './todo-list-image.model';

@model()
export class TodoList extends Entity {
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
  color?: string;

  @hasMany(() => Todo)
  todosfirst: Todo[];

  @hasOne(() => TodoListImage)
  image: TodoListImage;

  constructor(data?: Partial<TodoList>) {
    super(data);
  }
}

export interface TodoListRelations {
  // describe navigational properties here

  // add the following line
  todos?: TodoWithRelations[];
  // Add the following line
  image?: TodoListImageWithRelations;
}

export type TodoListWithRelations = TodoList & TodoListRelations;
