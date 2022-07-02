import { Equal, getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
		const user = await this.repository.findOne(
			user_id,
			{
				relations: ['games']
			}
		);

		if (user) return user;
		else throw new Error('User not found');
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(
			`SELECT * FROM users ORDER BY users.first_name ASC`
		);
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(
			`SELECT * FROM users WHERE UPPER(users.first_name) = UPPER('${first_name}') and UPPER(users.last_name) = UPPER('${last_name}')`
		);
  }
}
