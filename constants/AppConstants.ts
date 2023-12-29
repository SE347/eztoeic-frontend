import { PartInfo } from "@/app/tests/[id]/page";

export const MAIN_URL = "https://eztoeic-be.onrender.com";
export const LOGIN_URL = `/auth/login`;
export const REGISTER_URL = `/auth/register`;
export const GET_TEST_URL = `/tests`;
export const answerCountOfPart: Record<string, number> = {
  "1": 4,
  "2": 3,
  "3": 4,
  "4": 4,
  "5": 4,
  "6": 4,
  "7": 4,
};

export const partInfo: PartInfo[] = [
  {
    name: "Part 1",
    value: "1",
    questionCount: 6,
  },
  {
    name: "Part 2",
    value: "2",
    questionCount: 25,
  },
  {
    name: "Part 3",
    value: "3",
    questionCount: 39,
  },
  {
    name: "Part 4",
    value: "4",
    questionCount: 30,
  },
  {
    name: "Part 5",
    value: "5",
    questionCount: 30,
  },
  {
    name: "Part 6",
    value: "6",
    questionCount: 16,
  },
  {
    name: "Part 7",
    value: "7",
    questionCount: 54,
  },
];
