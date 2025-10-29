CREATE TABLE public."Autor" (
  autor CHARACTER VARYING NOT NULL,
  CONSTRAINT Autor_pkey PRIMARY KEY (autor)
) TABLESPACE pg_default;

CREATE TABLE public."Genero" (
  genero CHARACTER VARYING NOT NULL,
  CONSTRAINT Genero_pkey PRIMARY KEY (genero)
) TABLESPACE pg_default;

CREATE TABLE public."Usuarios" (
  "UID" UUID NOT NULL DEFAULT gen_random_uuid(),
  usuario CHARACTER VARYING NOT NULL,
  email CHARACTER VARYING NOT NULL,
  senha CHARACTER VARYING NOT NULL,
  adm BOOLEAN NOT NULL DEFAULT FALSE,
  genero CHARACTER VARYING NOT NULL,
  pontuacao BIGINT NOT NULL DEFAULT 0,
  CONSTRAINT Usuarios_pkey PRIMARY KEY ("UID"),
  CONSTRAINT Usuarios_email_key UNIQUE (email),
  CONSTRAINT Usuarios_usuario_key UNIQUE (usuario)
) TABLESPACE pg_default;

CREATE TABLE public."Livros" (
  "LID" UUID NOT NULL DEFAULT gen_random_uuid(),
  nome CHARACTER VARYING NOT NULL,
  descricao TEXT NOT NULL,
  autor CHARACTER VARYING NOT NULL,
  genero CHARACTER VARYING NOT NULL,
  CONSTRAINT Livro_pkey PRIMARY KEY ("LID"),
  CONSTRAINT Livro_autor_fkey FOREIGN KEY (autor)
      REFERENCES public."Autor" (autor),
  CONSTRAINT Livro_genero_fkey FOREIGN KEY (genero)
      REFERENCES public."Genero" (genero)
) TABLESPACE pg_default;

CREATE TABLE public."Comentarios" (
  "UID" UUID NOT NULL DEFAULT gen_random_uuid(),
  "LID" UUID NOT NULL DEFAULT gen_random_uuid(),
  descricao TEXT NOT NULL,
  nota BIGINT NULL,
  CONSTRAINT Comentarios_pkey PRIMARY KEY ("UID"),
  CONSTRAINT Comentarios_LID_fkey FOREIGN KEY ("LID")
      REFERENCES public."Livros" ("LID"),
  CONSTRAINT Comentarios_UID_fkey FOREIGN KEY ("UID")
      REFERENCES public."Usuarios" ("UID")
) TABLESPACE pg_default;

CREATE TABLE public."Lista" (
  "LID" UUID NOT NULL DEFAULT gen_random_uuid(),
  "UID" UUID NULL DEFAULT gen_random_uuid(),
  CONSTRAINT Lista_LID_fkey FOREIGN KEY ("LID")
      REFERENCES public."Livros" ("LID"),
  CONSTRAINT Lista_UID_fkey FOREIGN KEY ("UID")
      REFERENCES public."Usuarios" ("UID")
) TABLESPACE pg_default;

CREATE TABLE public."Fila_Emprestimo" (
  "UID" UUID NOT NULL DEFAULT gen_random_uuid(),
  "Data" DATE NULL,
  "LID" UUID NULL,
  CONSTRAINT Fila_Emprestimo_pkey PRIMARY KEY ("UID"),
  CONSTRAINT Fila_Emprestimo_LID_fkey FOREIGN KEY ("LID")
      REFERENCES public."Livros" ("LID"),
  CONSTRAINT Fila_Emprestimo_UID_fkey FOREIGN KEY ("UID")
      REFERENCES public."Usuarios" ("UID")
) TABLESPACE pg_default;

CREATE TABLE public."Fila_Tinder" (
  "UID" UUID NOT NULL DEFAULT gen_random_uuid(),
  CONSTRAINT Fila_Tinder_pkey PRIMARY KEY ("UID"),
  CONSTRAINT Fila_Tinder_UID_fkey FOREIGN KEY ("UID")
      REFERENCES public."Usuarios" ("UID")
) TABLESPACE pg_default;

CREATE TABLE public."Erro_Sugestao" (
  "UID" UUID NOT NULL DEFAULT gen_random_uuid(),
  descricao TEXT NOT NULL,
  CONSTRAINT Erro_Sugestao_pkey PRIMARY KEY ("UID"),
  CONSTRAINT Erro_Sugestao_UID_fkey FOREIGN KEY ("UID")
      REFERENCES public."Usuarios" ("UID")
) TABLESPACE pg_default;

CREATE TABLE public."Copia_Fisica" (
  "FID" UUID NOT NULL DEFAULT gen_random_uuid(),
  "Emprestado" BOOLEAN NULL DEFAULT FALSE,
  "LID" UUID NULL DEFAULT gen_random_uuid(),
  CONSTRAINT Copia_Fisica_pkey PRIMARY KEY ("FID"),
  CONSTRAINT Copia_Fisica_LID_fkey FOREIGN KEY ("LID")
      REFERENCES public."Livros" ("LID")
) TABLESPACE pg_default;

CREATE TABLE public."Ebook" (
  conteudo TEXT NOT NULL,
  "LID" UUID NOT NULL DEFAULT gen_random_uuid(),
  CONSTRAINT Ebook_pkey PRIMARY KEY (conteudo),
  CONSTRAINT Ebook_LID_fkey FOREIGN KEY ("LID")
      REFERENCES public."Livros" ("LID")
) TABLESPACE pg_default;

CREATE TABLE public."Pegar_Emprestado" (
  "EID" UUID NOT NULL DEFAULT gen_random_uuid(),
  "Emprestimo" DATE NOT NULL,
  "Devolucao" DATE NOT NULL,
  "Prazo" DATE NOT NULL,
  "UID" UUID NOT NULL,
  "FID" UUID NOT NULL,
  CONSTRAINT Pegar_Emprestado_pkey PRIMARY KEY ("EID"),
  CONSTRAINT Pegar_Emprestado_FID_fkey FOREIGN KEY ("FID")
      REFERENCES public."Copia_Fisica" ("FID"),
  CONSTRAINT Pegar_Emprestado_UID_fkey FOREIGN KEY ("UID")
      REFERENCES public."Usuarios" ("UID")
) TABLESPACE pg_default;

CREATE TABLE public."Historico" (
  "EID" UUID NOT NULL,
  CONSTRAINT Historico_pkey PRIMARY KEY ("EID"),
  CONSTRAINT Historico_EID_fkey FOREIGN KEY ("EID")
      REFERENCES public."Pegar_Emprestado" ("EID")
) TABLESPACE pg_default;


