import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/permissions/rbac";
import {
  HeroSection,
  CategoriesSection,
  FlagshipSpotlight,
  HowItWorksSection,
  FeaturedEvents,
  FeaturesSection,
  TestimonialsSection,
  FaqSection,
  LegacyBanner,
} from "@/components/marketing";
import { serializeEvents } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EventElite V2 — Official Campus Event Platform | DAV College Jalandhar",
  description: "Collegiate event management, hackathons, and pass portal for DAV College Jalandhar.",
};

export default async function HomePage() {
  const user = await getCurrentUser();

  let featuredEvents: any[] = [];
  let userRegistrations: string[] = [];
  let totalEventsCount = 120;
  let totalStudentsCount = 5000;

  try {
    const rawEvents = await prisma.event.findMany({
      where: { status: "PUBLISHED", startDate: { gte: new Date() } },
      include: { category: true, _count: { select: { registrations: true } } },
      orderBy: { startDate: "asc" },
      take: 6,
    });
    featuredEvents = serializeEvents(rawEvents);
    totalEventsCount = (await prisma.event.count({ where: { status: "PUBLISHED" } })) || 120;
    totalStudentsCount = (await prisma.user.count({ where: { role: "STUDENT" } })) || 5000;

    if (user) {
      const regs = await prisma.registration.findMany({
        where: { userId: user.id, status: "CONFIRMED" },
        select: { eventId: true },
      });
      userRegistrations = regs.map((r) => r.eventId);
    }
  } catch (error) {}

  return (
    <div className="space-y-24 pb-28">
      <HeroSection
        user={user}
        totalEventsCount={totalEventsCount}
        totalStudentsCount={totalStudentsCount}
      />
      <CategoriesSection />
      <FlagshipSpotlight />
      <HowItWorksSection />
      {featuredEvents.length > 0 && (
        <FeaturedEvents
          events={featuredEvents}
          userRegistrations={userRegistrations}
        />
      )}
      <FeaturesSection />
      <TestimonialsSection />
      <FaqSection />
      <LegacyBanner />
    </div>
  );
}
