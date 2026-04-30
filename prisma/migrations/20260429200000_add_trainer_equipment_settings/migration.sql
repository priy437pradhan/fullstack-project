CREATE TABLE IF NOT EXISTS "Trainer" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "specialty" TEXT NOT NULL,
  "experience" TEXT NOT NULL,
  "bio" TEXT NOT NULL,
  "imageUrl" TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Trainer_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Equipment" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "icon" TEXT NOT NULL DEFAULT 'dumbbell',
  "order" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "SiteSettings" (
  "id" TEXT NOT NULL,
  "gymName" TEXT NOT NULL DEFAULT 'Power Gym',
  "tagline" TEXT NOT NULL DEFAULT 'Stronger. Every day.',
  "phone" TEXT NOT NULL DEFAULT '',
  "email" TEXT NOT NULL DEFAULT '',
  "address" TEXT NOT NULL DEFAULT '',
  "instagramUrl" TEXT NOT NULL DEFAULT '',
  "facebookUrl" TEXT NOT NULL DEFAULT '',
  "twitterUrl" TEXT NOT NULL DEFAULT '',
  "youtubeUrl" TEXT NOT NULL DEFAULT '',
  "whatsappNum" TEXT NOT NULL DEFAULT '',
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);
