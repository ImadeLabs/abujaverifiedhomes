import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.property.deleteMany();

  await prisma.property.createMany({
    data: [
      {
        title: "Luxury 4 Bedroom Duplex in Wuse 2",
        price: 250000000,
        area: "Wuse 2",
        city: "Abuja",
        listingType: "sale",
        propertyType: "Duplex",
        verified: true,
        featured: true,
        status: "published",
        coverImageUrl:
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
      },
      {
        title: "Serviced 3 Bedroom Apartment in Gwarinpa",
        price: 8500000,
        area: "Gwarinpa",
        city: "Abuja",
        listingType: "rent",
        propertyType: "Apartment",
        verified: false,
        featured: true,
        status: "published",
        coverImageUrl:
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      },
      {
        title: "2 Bedroom Flat in Lokogoma",
        price: 3500000,
        area: "Lokogoma",
        city: "Abuja",
        listingType: "rent",
        propertyType: "Flat",
        verified: true,
        featured: false,
        status: "published",
        coverImageUrl:
          "https://images.unsplash.com/photo-1494526585095-c41746248156",
      },
      {
        title: "5 Bedroom Detached House in Asokoro",
        price: 600000000,
        area: "Asokoro",
        city: "Abuja",
        listingType: "sale",
        propertyType: "Detached House",
        verified: true,
        featured: true,
        status: "published",
        coverImageUrl:
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
      },
    ],
  });

  console.log("Seeded properties successfully.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });