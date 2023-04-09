export interface AllCharacterType {
  correct: number;
  incorrect: number;
  missed: number;
}

export interface WordInput {
  word: string;
  inputtedWord: string;
  status: "active" | "inactive" | "incorrect" | "correct";
}
export type WordInputArray = Array<WordInput>;
