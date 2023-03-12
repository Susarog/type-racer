export interface PreviousWord {
  word: string;
  isCorrect: boolean;
}
export type PreviousWordArray = Array<PreviousWord>;

export interface AllCharacterType {
  correct: number;
  incorrect: number;
  missed: number;
}
