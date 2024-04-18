/* eslint-disable prettier/prettier */
import { IUseCase } from '../../../../shared/application/use-case.interface';
import { CategoryId } from '../../../domain/category.aggregate';
import { ICategoryRepository } from '../../../domain/category.repository';

export class DeleteCategoryUseCase
  implements IUseCase<DeleteCategoryInput, DeleteCategoryOutput>
{
  constructor(private categoryRepo: ICategoryRepository) { }

  async execute(input: DeleteCategoryInput): Promise<DeleteCategoryOutput> {
    // buscar pelo id
    const categoryId = new CategoryId(input.id);
    // deletar do banco
    await this.categoryRepo.delete(categoryId);
  }
}

export type DeleteCategoryInput = {
  id: string;
};

type DeleteCategoryOutput = void;
