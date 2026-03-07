-- =====================================================
-- UPF Connect - Full Database Schema
-- =====================================================

-- --------------------------------
-- ENUMS
-- --------------------------------

CREATE TYPE exam_type AS ENUM ('EXAM', 'QCM', 'TP', 'PROJECT');
CREATE TYPE group_visibility AS ENUM ('PUBLIC', 'PRIVATE');
CREATE TYPE membership_role AS ENUM ('OWNER', 'ADMIN', 'MEMBER');
CREATE TYPE invite_status AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');
CREATE TYPE resource_type AS ENUM ('LINK', 'FILE', 'DOCUMENT');

-- --------------------------------
-- STUDENT (users)
-- --------------------------------

CREATE TABLE public.student (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name      TEXT NOT NULL,
  last_name       TEXT NOT NULL,
  email           TEXT UNIQUE NOT NULL,
  password_hash   TEXT NOT NULL,
  photo_url       TEXT,
  filiere         TEXT,
  study_year      TEXT,
  bio             TEXT,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- --------------------------------
-- AUTH SESSION
-- --------------------------------

CREATE TABLE public.auth_session (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id  UUID NOT NULL REFERENCES public.student(id) ON DELETE CASCADE,
  token       TEXT UNIQUE NOT NULL,
  expires_at  TIMESTAMP WITH TIME ZONE NOT NULL
);

-- --------------------------------
-- COURSE
-- --------------------------------

CREATE TABLE public.course (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  subject     TEXT NOT NULL,
  teacher     TEXT,
  semester    TEXT,
  description TEXT
);

-- --------------------------------
-- ENROLLMENT (Student <-> Course)
-- --------------------------------

CREATE TABLE public.enrollment (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id              UUID NOT NULL REFERENCES public.student(id) ON DELETE CASCADE,
  course_id               UUID NOT NULL REFERENCES public.course(id) ON DELETE CASCADE,
  role_or_view_permission TEXT DEFAULT 'VIEWER',
  created_at              TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (student_id, course_id)
);

-- --------------------------------
-- COURSE RESOURCE
-- --------------------------------

CREATE TABLE public.course_resource (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id   UUID NOT NULL REFERENCES public.course(id) ON DELETE CASCADE,
  type        resource_type NOT NULL,
  title       TEXT NOT NULL,
  url_or_path TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- --------------------------------
-- EXAM PAPER
-- --------------------------------

CREATE TABLE public.exam_paper (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title               TEXT NOT NULL,
  subject             TEXT NOT NULL,
  year                TEXT,
  exam_type           exam_type NOT NULL,
  author_student_id   UUID REFERENCES public.student(id) ON DELETE SET NULL,
  file_url_or_content TEXT NOT NULL,
  created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- --------------------------------
-- GROUP
-- --------------------------------

CREATE TABLE public.group (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                  TEXT NOT NULL,
  topic                 TEXT,
  visibility            group_visibility DEFAULT 'PUBLIC',
  created_by_student_id UUID REFERENCES public.student(id) ON DELETE SET NULL,
  created_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- --------------------------------
-- GROUP MEMBERSHIP
-- --------------------------------

CREATE TABLE public.group_membership (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id    UUID NOT NULL REFERENCES public.group(id) ON DELETE CASCADE,
  student_id  UUID NOT NULL REFERENCES public.student(id) ON DELETE CASCADE,
  role        membership_role DEFAULT 'MEMBER',
  joined_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (group_id, student_id)
);

-- --------------------------------
-- GROUP INVITE
-- --------------------------------

CREATE TABLE public.group_invite (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id             UUID NOT NULL REFERENCES public.group(id) ON DELETE CASCADE,
  invited_student_id   UUID NOT NULL REFERENCES public.student(id) ON DELETE CASCADE,
  invited_by_student_id UUID NOT NULL REFERENCES public.student(id) ON DELETE CASCADE,
  status               invite_status DEFAULT 'PENDING',
  created_at           TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- --------------------------------
-- MESSAGE (Group chat)
-- --------------------------------

CREATE TABLE public.message (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id          UUID NOT NULL REFERENCES public.group(id) ON DELETE CASCADE,
  sender_student_id UUID REFERENCES public.student(id) ON DELETE SET NULL,
  content           TEXT NOT NULL,
  sent_at           TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
