import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Todo, TodoRelations, TodoList} from '../models';
import {TodoListRepository} from './todo-list.repository';

export class TodoRepository extends DefaultCrudRepository<
  Todo,
  typeof Todo.prototype.id,
  TodoRelations
> {

  public readonly todolistfromtodo: BelongsToAccessor<TodoList, typeof Todo.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TodoListRepository') protected todoListRepositoryGetter: Getter<TodoListRepository>,
  ) {
    super(Todo, dataSource);
    this.todolistfromtodo = this.createBelongsToAccessorFor('todolistfromtodo', todoListRepositoryGetter,);
    this.registerInclusionResolver('todolistfromtodo', this.todolistfromtodo.inclusionResolver);
  }
}
