import { AnswerDto } from "../../../common/dto";

interface CategoriesDto {
  trivia_categories: AnswerDto[];
}

interface QuestionDto {
  type: "multiple" | "true/false";
  difficulty: "easy" | "medium" | "hard";
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface QuestionsDto {
  response_code: 0 | 1 | 2 | 3 | 4 | 5;
  results: QuestionDto[];
}

export const getCategoriesPool = async (): Promise<CategoriesDto> => {
  const res = await fetch("https://opentdb.com/api_category.php");
  return res.json() as Promise<CategoriesDto>;
};

export const getQuestionsPool = async (
  categoryId: number
): Promise<QuestionsDto> => {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=4&category=${categoryId}&type=multiple`
  );
  return res.json() as Promise<QuestionsDto>;
};
