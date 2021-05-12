import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {TodoList, TodoListRelations, Todo} from '../models';
import {TodoRepository} from './todo.repository';

export class TodoListRepository extends DefaultCrudRepository<
  TodoList,
  typeof TodoList.prototype.id,
  TodoListRelations
> {

  public readonly todosfirst: HasManyRepositoryFactory<Todo, typeof TodoList.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TodoRepository') protected todoRepositoryGetter: Getter<TodoRepository>,
  ) {
    super(TodoList, dataSource);
    this.todosfirst = this.createHasManyRepositoryFactoryFor('todosfirst', todoRepositoryGetter,);
    this.registerInclusionResolver('todosfirst', this.todosfirst.inclusionResolver);
  }

  public findTitle(title:string){
    return this.findOne({where:{title}});
  }

}
