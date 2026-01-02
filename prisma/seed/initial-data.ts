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
    id: '0f6386a7-70cc-4d09-9a54-64098d1975b3',
    name: 'LIQUADORA ACTIVE SENSE',
    price: 6_995.0,
    brand: 'OSTER',
    baseRate: 0.12,
    maxTerm: 36,
    imageUrl:
      'https://ladylee.net/cdn/shop/files/1099948_01_media_lly515Wx515H_dc8038c7-fc81-4969-b722-ce5c809c9926.jpg?v=1738536307',
  },
  {
    id: '279324dc-f348-4f7d-9c4c-7e8f1faa699c',
    name: 'TV LED 55 SMART AI THINQ 4K UT80',
    price: 10_995.0,
    brand: 'LG',
    baseRate: 0.14,
    maxTerm: 36,
    imageUrl:
      'https://ladylee.net/cdn/shop/files/1109825-01.webp?v=1740603805&width=713',
  },
  {
    id: '7ecbd0f0-3f48-495d-ab73-6fa53618594e',
    name: 'AIRE ACONDICIONADO 18KBTU DUAL COOL INVERTER',
    price: 17_999.0,
    brand: 'LG',
    baseRate: 0.13,
    maxTerm: 36,
    imageUrl:
      'https://ladylee.net/cdn/shop/files/6001348-01.jpg?v=1738689069&width=713',
  },
  {
    id: 'b59f5c08-78c1-439a-86f6-32bda59d3a0f',
    name: 'CAMA UNIPERSONAL OTONO',
    price: 6_499.0,
    brand: 'OLYMPIA',
    baseRate: 0.11,
    maxTerm: 36,
    imageUrl:
      'https://ladylee.net/cdn/shop/files/1099702-01.webp?v=1748896882&width=713',
  },
  {
    id: '91e265bb-851b-47c2-9b52-5d517482d7f1',
    name: 'SECADORA ELECTRICA 22KG',
    price: 13_999.0,
    brand: 'GENERAL ELECTRIC',
    baseRate: 0.14,
    maxTerm: 36,
    imageUrl:
      'https://ladylee.net/cdn/shop/files/general-electric-secadora-electrica-22-kg-frontal.webp?v=1766097383&width=713',
  },
  {
    id: '6c1eb85a-1e4b-4cc6-a87d-3e65ed695fd2',
    name: 'LAVADORA 25KG SMART INVERTER BLACK',
    price: 15_499.0,
    brand: 'LG',
    baseRate: 0.15,
    maxTerm: 36,
    imageUrl:
      'https://ladylee.net/cdn/shop/files/DZ-01.avif?v=1760989106&width=713',
  },
  {
    id: '40dd4206-8047-4fc4-b573-db8ae339ac82',
    name: 'CELULAR HONOR 400 PRO',
    price: 19_998.34,
    brand: 'HONOR',
    baseRate: 0.2,
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
