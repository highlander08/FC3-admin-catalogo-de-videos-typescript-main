/* eslint-disable prettier/prettier */
import { IUseCase } from '../../../../shared/application/use-case.interface';
import { NotFoundError } from '../../../../shared/domain/errors/not-found.error';
import { EntityValidationError } from '../../../../shared/domain/validators/validation.error';
import { Category, CategoryId } from '../../../domain/category.aggregate';
import { ICategoryRepository } from '../../../domain/category.repository';
import {
  CategoryOutput,
  CategoryOutputMapper,
} from '../common/category-output';
import { UpdateCategoryInput } from './update-category.input';

export class UpdateCategoryUseCase
  implements IUseCase<UpdateCategoryInput, UpdateCategoryOutput>
{
  constructor(private categoryRepo: ICategoryRepository) { }

  async execute(input: UpdateCategoryInput): Promise<UpdateCategoryOutput> {
    // buscar pelo id
    const categoryId = new CategoryId(input.id);
    // buscar no bando pelo id
    const category = await this.categoryRepo.findById(categoryId);
    // verificar se existe no banco
    if (!category) {
      throw new NotFoundError(input.id, Category);
    }
    // se campo existir altere o mesmo
    input.name && category.changeName(input.name);
    // se campo existir altere o mesmo
    if (input.description !== undefined) {
      category.changeDescription(input.description);
    }
    // se campo existir altere o mesmo
    if (input.is_active === true) {
      category.activate();
    }
    // se campo existir altere o mesmo
    if (input.is_active === false) {
      category.deactivate();
    }
    // verificar se tem erro
    if (category.notification.hasErrors()) {
      throw new EntityValidationError(category.notification.toJSON());
    }
    // atualizar no banco
    await this.categoryRepo.update(category);
    // retornar saida dos dados;
    return CategoryOutputMapper.toOutput(category);
  }
}

export type UpdateCategoryOutput = CategoryOutput;
