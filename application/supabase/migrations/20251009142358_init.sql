create schema if not exists "gis";

create extension if not exists "postgis" with schema "gis" version '3.3.7';

create table "public"."profiles" (
    "id" uuid not null,
    "first_name" text not null,
    "last_name" text not null,
    "role" text not null,
    "home_location" gis.geography(Point,4326),
    "current_location" gis.geography(Point,4326) not null
);


alter table "public"."profiles" enable row level security;

CREATE INDEX profile_current_location_geo_index ON public.profiles USING gist (current_location);

CREATE INDEX profile_home_location_geo_index ON public.profiles USING gist (home_location);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  insert into profiles
  values (
  	new.id,
  	new.raw_user_meta_data ->> 'first_name',
  	new.raw_user_meta_data ->> 'last_name',
  	new.raw_user_meta_data ->> 'role',
  	new.raw_user_meta_data ->> 'home_location',
  	new.raw_user_meta_data ->> 'current_location'
  );
  return new;
end;
$function$
;

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";


