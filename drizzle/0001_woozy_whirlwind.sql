CREATE TABLE `auth_tokens` (
	`id` integer PRIMARY KEY NOT NULL,
	`access_token` text NOT NULL,
	`refresh_token` text NOT NULL,
	`expires_at` integer NOT NULL
);
