import { Prisma } from '../../src/generated/prisma/client';

const users: Prisma.UserCreateManyInput[] = [
  {
    id: '5e56aba6-8a80-467f-ac75-0e6e53a8e23c',
    name: 'Abdiel Emanuel Licona Escobar',
    email: 'emanuel.licona02@gmail.com',
    documentNumber: '0101200003643',
    password: '12345678',
  },
];

const creditLines: Prisma.CreditLineCreateManyInput[] = [
  {
    creditLimit: 66_332.12,
    interestRate: 0.05,
    userId: '5e56aba6-8a80-467f-ac75-0e6e53a8e23c',
  },
];

const products: Prisma.ProductCreateManyInput[] = [
  {
    name: 'LIQUADORA ACTIVE SENSE',
    price: 6_995.0,
    brand: 'OSTER',
    baseRate: 0.06,
    maxTerm: 36,
    imageUrl:
      'https://ladylee.net/cdn/shop/files/1099948_01_media_lly515Wx515H_dc8038c7-fc81-4969-b722-ce5c809c9926.jpg?v=1738536307',
  },
  {
    name: 'TV LED 55 SMART AI THINQ 4K UT80',
    price: 10_995.0,
    brand: 'LG',
    baseRate: 0.1,
    maxTerm: 36,
    imageUrl:
      'https://ladylee.net/cdn/shop/files/1109825-01.webp?v=1740603805&width=713',
  },
  {
    name: 'AIRE ACONDICIONADO 18KBTU DUAL COOL INVERTER',
    price: 17_999.0,
    brand: 'LG',
    baseRate: 0.5,
    maxTerm: 36,
    imageUrl:
      'https://ladylee.net/cdn/shop/files/6001348-01.jpg?v=1738689069&width=713',
  },
  {
    name: 'CAMA UNIPERSONAL OTONO',
    price: 6_499.0,
    brand: 'OLYMPIA',
    baseRate: 0.3,
    maxTerm: 36,
    imageUrl:
      'https://ladylee.net/cdn/shop/files/1099702-01.webp?v=1748896882&width=713',
  },
  {
    name: 'SECADORA ELECTRICA 22KG',
    price: 13_999.0,
    brand: 'GENERAL ELECTRIC',
    baseRate: 0.4,
    maxTerm: 36,
    imageUrl:
      'https://ladylee.net/cdn/shop/files/general-electric-secadora-electrica-22-kg-frontal.webp?v=1766097383&width=713',
  },
  {
    name: 'LAVADORA 25KG SMART INVERTER BLACK',
    price: 15_499.0,
    brand: 'LG',
    baseRate: 0.4,
    maxTerm: 36,
    imageUrl:
      'https://ladylee.net/cdn/shop/files/DZ-01.avif?v=1760989106&width=713',
  },
  {
    name: 'CELULAR HONOR 400 PRO',
    price: 19_998.34,
    brand: 'HONOR',
    baseRate: 0.6,
    maxTerm: 36,
    imageUrl:
      'https://ladylee.net/cdn/shop/files/honor-celular-honor-400-pro-12gb-ram-plata.jpg?v=1749489619&width=713',
  },
];

export const initialData = {
  users,
  creditLines,
  products,
};
