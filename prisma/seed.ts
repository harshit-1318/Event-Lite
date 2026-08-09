import "dotenv/config";
import { prisma } from "../lib/db/prisma";
import { cleanDatabase } from "./seed/clean.seed";
import { seedUsers } from "./seed/users.seed";
import { seedCategories } from "./seed/categories.seed";
import { seedEvents } from "./seed/events.seed";
import { seedRegistrations } from "./seed/registrations.seed";
import { seedNotifications } from "./seed/notifications.seed";

async function main() {
  console.log("🌱 Starting EventElite V2 modular seed...");
  await cleanDatabase(prisma);

  const { faculty1, student1, student2 } = await seedUsers(prisma);
  const categoryMap = await seedCategories(prisma);
  const events = await seedEvents(prisma, faculty1, categoryMap);

  await seedRegistrations(prisma, [student1, student2], events);
  await seedNotifications(prisma, [student1, student2]);

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
