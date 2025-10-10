CREATE TYPE profile_role AS ENUM ('passenger', 'driver');

create table profiles (
	id uuid primary key references auth.users on delete cascade,
	full_name text not null,
	role profile_role not null,
	home_location gis.geography(POINT),
	current_location gis.geography(POINT) not null
);

create index profile_current_location_geo_index on profiles using GIST (current_location);
create index profile_home_location_geo_index on profiles using GIST (home_location);
alter table profiles enable row level security;

-- inserts a row into public.profiles
create function handle_new_user_profile()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
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
$$;
-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user_profile();
