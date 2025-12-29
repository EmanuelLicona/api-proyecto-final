import { Prisma } from '../../src/generated/prisma/client';

const users: Prisma.UserCreateInput[] = [
  {
    name: 'Abdiel Emanuel Licona Escobar',
    email: 'emanuel.licona02@gmail.com',
    password: '12345678',
  },
];

export const initialData = {
  users,
};
