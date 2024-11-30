-- Extend virtual_tas table with new fields
alter table public.virtual_tas add column if not exists instructor_name text;
alter table public.virtual_tas add column if not exists instructor_email text;
alter table public.virtual_tas add column if not exists ta_email text;
alter table public.virtual_tas add column if not exists welcome_message text;
alter table public.virtual_tas add column if not exists prompt_questions text[];
alter table public.virtual_tas add column if not exists default_prompt text;
alter table public.virtual_tas add column if not exists ai_guardrails text;
alter table public.virtual_tas add column if not exists teaching_style text;
alter table public.virtual_tas add column if not exists no_answer_response text;
alter table public.virtual_tas add column if not exists canvas_enabled boolean default false;
alter table public.virtual_tas add column if not exists canvas_api_key text;
alter table public.virtual_tas add column if not exists canvas_course_url text;
alter table public.virtual_tas add column if not exists panopto_enabled boolean default false;
alter table public.virtual_tas add column if not exists panopto_api_key text;
alter table public.virtual_tas add column if not exists panopto_course_url text;
alter table public.virtual_tas add column if not exists captioning_enabled boolean default false;