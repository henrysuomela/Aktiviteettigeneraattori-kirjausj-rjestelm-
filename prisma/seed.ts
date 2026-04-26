import { prisma } from '../src/lib/prisma.ts';

async function main() {
  const ulkoilu = await prisma.category.upsert({
    where: { name: 'Ulkoilu' },
    update: {},
    create: { name: 'Ulkoilu' }
  });

  const luova = await prisma.category.upsert({
    where: { name: 'luova' },
    update: {},
    create: { name: 'luova' }
  });

  const sosiaalinen = await prisma.category.upsert({
    where: { name: 'sosiaalinen' },
    update: {},
    create: { name: 'sosiaalinen' }
  });


  const poolSuggestions = [
    { name: 'Käy patikoimassa', categoryId: ulkoilu.id },
    { name: 'Käy puistopiknikillä', categoryId: ulkoilu.id },
    { name: 'Käy pyörälenkillä', categoryId: ulkoilu.id },
    { name: 'Käy heittelemässä korista', categoryId: ulkoilu.id },
    { name: 'Piirrä tai maalaa', categoryId: luova.id },
    { name: 'Kirjoita lyhyt novelli', categoryId: luova.id },
    { name: 'Aloita koodausprojekti', categoryId: luova.id },
    { name: 'Tee lyhyt musiikkilooppi', categoryId: luova.id },
    { name: 'Järjestä lautapeli-ilta', categoryId: sosiaalinen.id },
    { name: 'Kokkaa ystävien kanssa', categoryId: sosiaalinen.id },
    { name: 'Käy torilla', categoryId: sosiaalinen.id },
    { name: 'Käy elokuvissa kaverin kanssa', categoryId: sosiaalinen.id },
  ];

  for (const suggestion of poolSuggestions) {
    await prisma.suggestion.create({
      data: {
        name: suggestion.name,
        categoryId: suggestion.categoryId,
        userId: null,
        accepted: false
      }
    });
  }

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });