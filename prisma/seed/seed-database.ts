import { PasswordHandler } from 'src/utils/password-handler';
import { db } from './db';
import { initialData } from './initial-data';

async function main() {
  try {
    await db.$transaction(
      async (tx) => {
        await tx.user.deleteMany();

        const usersList = initialData.users.map((x) => ({
          ...x,
          password: PasswordHandler.hashPassword(x.password),
        }));

        await tx.user.createMany({ data: usersList });
      },
      {
        maxWait: 5000,
        timeout: 30000,
      },
    );

    console.log('✅ Seed ejecutado correctamente');
  } catch (error) {
    console.error('❌ Error ejecutando seed:', error);
    throw error;
  }
}

// Ejecutar con validación de entorno
void (async () => {
  if (process.env.NODE_ENV === 'production') {
    console.error('⚠️  No se puede ejecutar en producción');
    process.exit(1);
  }

  await main();
  await db.$disconnect();
})();
