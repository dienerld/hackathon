DO $$ BEGIN
 CREATE TYPE "public"."question_level" AS ENUM('easy', 'medium', 'hard');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."question_type" AS ENUM('multiple-choice', 'true-or-false', 'free-text');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "friendships" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"friend_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rankings" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"score" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "topics" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"matter_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "questions" DROP CONSTRAINT "questions_matter_id_classroom_id_unique";--> statement-breakpoint
ALTER TABLE "questions" DROP CONSTRAINT "questions_matter_id_matters_id_fk";
--> statement-breakpoint
ALTER TABLE "questions" DROP CONSTRAINT "questions_classroom_id_classrooms_id_fk";
--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "level" "question_level" NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "type" "question_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "topic_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "options" json;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "code" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friendships" ADD CONSTRAINT "friendships_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friendships" ADD CONSTRAINT "friendships_friend_id_users_id_fk" FOREIGN KEY ("friend_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rankings" ADD CONSTRAINT "rankings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "topics" ADD CONSTRAINT "topics_matter_id_matters_id_fk" FOREIGN KEY ("matter_id") REFERENCES "public"."matters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questions" ADD CONSTRAINT "questions_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "questions" DROP COLUMN IF EXISTS "matter_id";--> statement-breakpoint
ALTER TABLE "questions" DROP COLUMN IF EXISTS "classroom_id";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "full_name";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_code_unique" UNIQUE("code");