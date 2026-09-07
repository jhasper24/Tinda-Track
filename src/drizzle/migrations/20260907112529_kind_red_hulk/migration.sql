CREATE TYPE "markupType" AS ENUM('percent', 'fixed');--> statement-breakpoint
CREATE TABLE "product" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"storeId" uuid NOT NULL,
	"name" text NOT NULL,
	"cost" numeric(10,2) NOT NULL,
	"markupType" "markupType" NOT NULL,
	"markupValue" numeric(10,2) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_storeId_store_id_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE;