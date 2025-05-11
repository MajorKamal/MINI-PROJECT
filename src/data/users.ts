import { User } from '../types';

// In a real application, this would come from a secure backend API
export const users: User[] = [
  {
    id: '1',
    username: 'student',
    password: 'password' // Never store passwords in plain text in a real app
  }
];

export const findUser = (username: string, password: string): User | undefined => {
  return users.find(user => user.username === username && user.password === password);
};