CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`full_name` text
);
--> statement-breakpoint
ALTER TABLE `raindrops` ADD `domain` text;--> statement-breakpoint
ALTER TABLE `raindrops` ADD `creator_id` integer;--> statement-breakpoint
ALTER TABLE `raindrops` ADD `creator_name` text;--> statement-breakpoint
ALTER TABLE `raindrops` ADD `important` integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `raindrops` ADD `removed` integer DEFAULT false;