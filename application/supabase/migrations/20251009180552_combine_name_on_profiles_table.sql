alter table "public"."profiles" drop column "first_name";

alter table "public"."profiles" drop column "last_name";

alter table "public"."profiles" add column "full_name" text not null;


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
	new.raw_user_meta_data ->> 'full_name',
  	new.raw_user_meta_data ->> 'role',
  	new.raw_user_meta_data ->> 'home_location',
  	new.raw_user_meta_data ->> 'current_location'
  );
  return new;
end;
$function$
;


