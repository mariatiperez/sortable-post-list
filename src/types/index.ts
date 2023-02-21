export interface ListItemI {
  id: number;
  title: string;
  body: string;
}

export interface TimelineItemI {
  itemId: number;
  prevIndex: number;
  currIndex: number;
  prevState?: number[];
}

export interface MoveI {
  direction: "down" | "up";
  index: number;
  item: ListItemI;
}
