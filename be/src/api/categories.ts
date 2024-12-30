import { AnswerDto } from "../../../common/dto";

interface CategoriesDto {
  trivia_categories: AnswerDto[];
}

export interface QuestionDto {
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

const categoriesResponse = {
  trivia_categories: [
    {
      id: 9,
      name: "General Knowledge",
    },
    {
      id: 10,
      name: "Entertainment: Books",
    },
    {
      id: 11,
      name: "Entertainment: Film",
    },
    {
      id: 12,
      name: "Entertainment: Music",
    },
    {
      id: 13,
      name: "Entertainment: Musicals & Theatres",
    },
    {
      id: 14,
      name: "Entertainment: Television",
    },
    {
      id: 15,
      name: "Entertainment: Video Games",
    },
    {
      id: 16,
      name: "Entertainment: Board Games",
    },
    {
      id: 17,
      name: "Science & Nature",
    },
    {
      id: 18,
      name: "Science: Computers",
    },
    {
      id: 19,
      name: "Science: Mathematics",
    },
    {
      id: 20,
      name: "Mythology",
    },
    {
      id: 21,
      name: "Sports",
    },
    {
      id: 22,
      name: "Geography",
    },
    {
      id: 23,
      name: "History",
    },
    {
      id: 24,
      name: "Politics",
    },
    {
      id: 25,
      name: "Art",
    },
    {
      id: 26,
      name: "Celebrities",
    },
    {
      id: 27,
      name: "Animals",
    },
    {
      id: 28,
      name: "Vehicles",
    },
    {
      id: 29,
      name: "Entertainment: Comics",
    },
    {
      id: 30,
      name: "Science: Gadgets",
    },
    {
      id: 31,
      name: "Entertainment: Japanese Anime & Manga",
    },
    {
      id: 32,
      name: "Entertainment: Cartoon & Animations",
    },
  ],
};

export const getCategoriesPool = async (): Promise<CategoriesDto> => {
  return categoriesResponse;

  const res = await fetch("https://opentdb.com/api_category.php");
  return res.json() as Promise<CategoriesDto>;
};

export const getQuestionsPool = async (
  categoryId: number,
  amount: number
): Promise<QuestionsDto> => {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&type=multiple`
  );
  return res.json() as Promise<QuestionsDto>;
};
