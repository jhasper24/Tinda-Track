CREATE TABLE "store" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"ownerId" text NOT NULL UNIQUE,
	"name" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "store" ADD CONSTRAINT "store_ownerId_user_id_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE;