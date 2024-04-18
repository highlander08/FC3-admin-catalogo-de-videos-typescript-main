/* eslint-disable prettier/prettier */
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '../../../../shared/application/pagination-output';
import { IUseCase } from '../../../../shared/application/use-case.interface';
import { SortDirection } from '../../../../shared/domain/repository/search-params';
import {
  CategoryFilter,
  CategorySearchParams,
  CategorySearchResult,
  ICategoryRepository,
} from '../../../domain/category.repository';
import {
  CategoryOutput,
  CategoryOutputMapper,
} from '../common/category-output';

export class ListCategoriesUseCase
  implements IUseCase<ListCategoriesInput, ListCategoriesOutput>
{
  constructor(private categoryRepo: ICategoryRepository) { }

  async execute(input: ListCategoriesInput): Promise<ListCategoriesOutput> {
    // definir tratamento de parametros
    const params = new CategorySearchParams(input);
    // buscar resultados pelos parametros
    const searchResult = await this.categoryRepo.search(params);
    // retornar os resultados
    return this.toOutput(searchResult);
  }

  // função para tratar a saida dos dados
  private toOutput(searchResult: CategorySearchResult): ListCategoriesOutput {
    const { items: _items } = searchResult;
    const items = _items.map((i) => {
      return CategoryOutputMapper.toOutput(i);
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}

export type ListCategoriesInput = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: CategoryFilter | null;
};

export type ListCategoriesOutput = PaginationOutput<CategoryOutput>;
