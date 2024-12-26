import { CategoryDto } from "../../../common/clientEvents";

interface CategoriesDto {
  trivia_categories: CategoryDto[];
}

export const getCategoriesPool = async (): Promise<CategoriesDto> => {
  const res = await fetch("https://opentdb.com/api_category.php");
  return res.json() as Promise<CategoriesDto>;
};
