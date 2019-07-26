import { Label } from './label.model';

export interface Task{
  _id:string,
  title: string,
  notes: string,
  list: string,
  label:string[],
  reminder: string,
  groupId: string,
  userId: string
}
