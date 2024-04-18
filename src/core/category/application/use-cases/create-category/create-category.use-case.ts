/* eslint-disable prettier/prettier */
import { IUseCase } from '../../../../shared/application/use-case.interface';
import { EntityValidationError } from '../../../../shared/domain/validators/validation.error';
import { Category } from '../../../domain/category.aggregate';
import { ICategoryRepository } from '../../../domain/category.repository';
import {
  CategoryOutput,
  CategoryOutputMapper,
} from '../common/category-output';
import { CreateCategoryInput } from './create-category.input';

export class CreateCategoryUseCase
  implements IUseCase<CreateCategoryInput, CreateCategoryOutput>
{
  constructor(private readonly categoryRepo: ICategoryRepository) { }

  async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
    //cria categoria
    const entity = Category.create(input);
    //verifica se tem erro
    if (entity.notification.hasErrors()) {
      throw new EntityValidationError(entity.notification.toJSON());
    }
    //persiste no banco de dados
    await this.categoryRepo.insert(entity);
    // retorna uma saida
    return CategoryOutputMapper.toOutput(entity);
  }
}

export type CreateCategoryOutput = CategoryOutput;
