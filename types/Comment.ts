export interface Comment {
  author: string;
  body: string;
  choice: number;
  votingPower: number;
  id?: string;
  src?: string;
  active?: boolean;
}
