CREATE TABLE `collections` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text,
	`public` integer DEFAULT false NOT NULL,
	`count` integer,
	`cover` text,
	`last_action` text,
	`description` text,
	`created` text,
	`last_update` text,
	`parent` integer,
	`slug` text,
	`author` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE `raindrops` (
	`id` integer PRIMARY KEY NOT NULL,
	`link` text,
	`title` text,
	`excerpt` text,
	`note` text,
	`created` text,
	`cover` text,
	`type` text,
	`last_update` text,
	`collection_id` integer,
	`tags` text,
	`raw` text,
	`synced_at` text
);
--> statement-breakpoint
CREATE TABLE `sync_meta` (
	`id` integer PRIMARY KEY NOT NULL,
	`last_sync` text
);
