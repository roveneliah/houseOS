export interface Comment {
  proposalId: string;
  author: string;
  body: string;
  choice: number;
  votingPower?: number;
  active?: boolean;
}
