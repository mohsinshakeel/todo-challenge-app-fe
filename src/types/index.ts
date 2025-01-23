export enum Status {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
}

export interface ITask {
  id: string;
  title: string;
  status: Status;
  color: string;
}
