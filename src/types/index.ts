export interface ListItemI {
  id: number;
  title: string;
  body: string;
}

export interface TimelineItemI {
  itemId: number;
  prevIndex: number;
  currIndex: number;
  state?: number[];
}
