/*
  seed File have issue currently
  This file can be used only after fixing the issue.
  During the time of creation of this file. The command is
  ``` node seed.ts ```
*/

import { AppDataSource } from './data-source';
import { Advice } from './advice/entities/advice.entity';
import { AdviceCategory, AdviceFeeling } from '../schemas/advice.schema';

const seedAdvice = async () => {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(Advice);
  const count = await repo.count();

  if (count > 0) {
    console.log('⚠️ Data already seeded');
    await AppDataSource.destroy();
    return;
  }

  const advices = [
    {
      advice: 'Focus on building skills, not just chasing jobs.',
      category: AdviceCategory.CAREER,
      feeling: AdviceFeeling.MOTIVATED,
    },
    {
      advice: "Communicate openly, even when it's uncomfortable.",
      category: AdviceCategory.RELATIONSHIP,
      feeling: AdviceFeeling.ANXIOUS,
    },
    {
      advice: 'Sleep is productive. Rest is part of the process.',
      category: AdviceCategory.HEALTH,
      feeling: AdviceFeeling.CALM,
    },
    {
      advice: 'Save before you spend, not after.',
      category: AdviceCategory.FINANCE,
      feeling: AdviceFeeling.STUCK,
    },
    {
      advice: 'Create something every day, even if it is small.',
      category: AdviceCategory.CREATIVITY,
      feeling: AdviceFeeling.CURIOUS,
    },
    {
      advice: 'Your mindset shapes your reality.',
      category: AdviceCategory.MINDSET,
      feeling: AdviceFeeling.HAPPY,
    },
  ];

  const entities = repo.create(advices);
  await repo.save(entities);

  console.log('Seeding completed successfully!');
  await AppDataSource.destroy();
};

seedAdvice().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
