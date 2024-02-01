import { ReactElement } from 'react';

export type ChildrenType = ReactElement | undefined;

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  list: List;
  tags: string[];
  subtasks: Subtask[];
  completed: boolean;
  completedAt: string;
  subtasksCount: number;
}

export interface List {
  _id: string;
  name: string;
  color: string;
  tasks: Task[];
  createdAt: string;
}

export interface Tag {
  _id: string;
  name: string;
  tasks: Task[];
}

export interface Subtask {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  task: Task;
}
