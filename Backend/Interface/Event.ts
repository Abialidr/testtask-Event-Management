export interface IEvent {
  slug: string;
  name: string;
  description: string;
  poster: string;
  start_date: Date;
  end_date: Date;
  tickets: [string];
}
