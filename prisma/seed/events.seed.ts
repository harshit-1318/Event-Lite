import { PrismaClient, EventStatus } from "@prisma/client";

export async function seedEvents(prisma: PrismaClient, faculty: any, categoryMap: Map<string, any>) {
  const events = [
    {
      title: "TechVishwa 2026: AI & Web3 Hackathon",
      slug: "techvishwa-2026-ai-web3-hackathon",
      categorySlug: "workshops-bootcamps",
      description: "A premier 36-hour hackathon bringing together top student developers to build AI solutions.",
      shortDescription: "36-hour national level AI & Web3 hackathon with ₹1,00,000+ prize pool.",
      venue: "Auditorium 1, Science Block",
      startDate: new Date(Date.now() + 5 * 24 * 3600 * 1000),
      endDate: new Date(Date.now() + 7 * 24 * 3600 * 1000),
      time: "09:00 AM – 06:00 PM",
      fee: 250,
      capacity: 150,
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200",
    },
    {
      title: "National Conference on Quantum Computing",
      slug: "national-conference-quantum-computing-2026",
      categorySlug: "academic-conferences",
      description: "Distinguished keynote speakers, research presentations, and quantum algorithms workshop.",
      shortDescription: "Exploring breakthroughs in quantum information science and post-quantum cryptography.",
      venue: "Main Conference Hall",
      startDate: new Date(Date.now() + 12 * 24 * 3600 * 1000),
      endDate: new Date(Date.now() + 13 * 24 * 3600 * 1000),
      time: "10:00 AM – 04:30 PM",
      fee: 0,
      capacity: 200,
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200",
    },
    {
      title: "DAV Virasat 2026: Youth Cultural Fest",
      slug: "dav-virasat-2026-youth-cultural-fest",
      categorySlug: "cultural-festivals",
      description: "Celebration of Punjabi folk music, Bhangra championships, theatrical plays, and art exhibitions.",
      shortDescription: "Annual cultural extravaganza featuring 25+ competitive events and celebrity nights.",
      venue: "Open Air Theatre",
      startDate: new Date(Date.now() + 20 * 24 * 3600 * 1000),
      endDate: new Date(Date.now() + 22 * 24 * 3600 * 1000),
      time: "11:00 AM – 08:00 PM",
      fee: 100,
      capacity: 500,
      imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200",
    },
  ];

  const createdEvents = [];
  for (const ev of events) {
    const category = categoryMap.get(ev.categorySlug) || Array.from(categoryMap.values())[0];
    const created = await prisma.event.create({
      data: {
        title: ev.title,
        slug: ev.slug,
        categoryId: category.id,
        organizerId: faculty.id,
        description: ev.description,
        shortDescription: ev.shortDescription,
        venue: ev.venue,
        startDate: ev.startDate,
        endDate: ev.endDate,
        time: ev.time,
        fee: ev.fee,
        capacity: ev.capacity,
        imageUrl: ev.imageUrl,
        status: EventStatus.PUBLISHED,
      },
    });
    createdEvents.push(created);
  }

  console.log(`🎉 Seeded ${createdEvents.length} events.`);
  return createdEvents;
}
