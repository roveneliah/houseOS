export interface Vote {
  address: string;
  weight: number;
  comment?: string;
}

export interface PollOption {
  id: number;
  text: string;
  votes: Vote[];
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
}
