ALTER TABLE "questions" ALTER COLUMN "options" SET DATA TYPE json[];--> statement-breakpoint
ALTER TABLE "matters" ADD COLUMN "class_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "matters" ADD CONSTRAINT "matters_class_id_classrooms_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."classrooms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
