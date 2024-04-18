/* eslint-disable prettier/prettier */
import { IUseCase } from '../../../../shared/application/use-case.interface';
import { NotFoundError } from '../../../../shared/domain/errors/not-found.error';
import { Category, CategoryId } from '../../../domain/category.aggregate';
import { ICategoryRepository } from '../../../domain/category.repository';
import {
  CategoryOutput,
  CategoryOutputMapper,
} from '../common/category-output';

export class GetCategoryUseCase
  implements IUseCase<GetCategoryInput, GetCategoryOutput>
{
  constructor(private categoryRepo: ICategoryRepository) { }

  async execute(input: GetCategoryInput): Promise<GetCategoryOutput> {
    // buscar pelo id
    const categoryId = new CategoryId(input.id);
    // buscar no banco de dados
    const category = await this.categoryRepo.findById(categoryId);
    // verifica se existe categoria no banco
    if (!category) {
      throw new NotFoundError(input.id, Category);
    }
    // retorna a categoria
    return CategoryOutputMapper.toOutput(category);
  }
}

export type GetCategoryInput = {
  id: string;
};

export type GetCategoryOutput = CategoryOutput;
