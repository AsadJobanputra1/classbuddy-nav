create table if not exists public.virtual_tas (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  course text not null,
  email text not null,
  schedule text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.virtual_tas enable row level security;

-- Create policy to allow all users to view virtual TAs
create policy "Virtual TAs are viewable by everyone" 
on public.virtual_tas for select 
to authenticated
using (true);

-- Create policy to allow authenticated users to insert their own virtual TAs
create policy "Users can insert their own virtual TAs" 
on public.virtual_tas for insert 
to authenticated 
with check (true);

-- Create policy to allow users to update their own virtual TAs
create policy "Users can update their own virtual TAs" 
on public.virtual_tas for update 
to authenticated 
using (true);

-- Create policy to allow users to delete their own virtual TAs
create policy "Users can delete their own virtual TAs" 
on public.virtual_tas for delete 
to authenticated 
using (true);

-- Create an update trigger for the updated_at column
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

create trigger handle_virtual_tas_updated_at
  before update on public.virtual_tas
  for each row
  execute function public.handle_updated_at();