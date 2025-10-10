create type "public"."profile_role" as enum ('passenger', 'driver');

alter table "public"."profiles" alter column "role" set data type profile_role using "role"::profile_role;


