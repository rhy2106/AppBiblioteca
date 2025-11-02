CREATE TABLE "Usuarios" (
  "UID" uuid NOT NULL DEFAULT gen_random_uuid(),
  "usuario" character varying NOT NULL UNIQUE,
  "email" character varying NOT NULL UNIQUE,
  "senha" character varying NOT NULL,
  "adm" boolean NOT NULL DEFAULT false,
  "genero" character varying NOT NULL,
  "pontuacao" bigint NOT NULL DEFAULT '0'::bigint,
  CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("UID")
);

CREATE TABLE "Livros" (
  "LID" uuid NOT NULL DEFAULT gen_random_uuid(),
  "nome" character varying NOT NULL,
  "descricao" text NOT NULL,
  "autor" character varying NOT NULL,
  "genero" character varying NOT NULL,
  CONSTRAINT "Livros_pkey" PRIMARY KEY ("LID")
);

CREATE TABLE "Copia_Fisica" (
  "FID" uuid NOT NULL DEFAULT gen_random_uuid(),
  "Emprestado" boolean DEFAULT false,
  "LID" uuid DEFAULT gen_random_uuid(),
  CONSTRAINT "Copia_Fisica_pkey" PRIMARY KEY ("FID"),
  CONSTRAINT "Copia_Fisica_LID_fkey" FOREIGN KEY ("LID") REFERENCES "Livros"("LID")
);

CREATE TABLE "Pegar_Emprestado" (
  "EID" uuid NOT NULL DEFAULT gen_random_uuid(),
  "Emprestimo" date NOT NULL DEFAULT now(),
  "Devolucao" date,
  "Prazo" date NOT NULL DEFAULT (CURRENT_DATE + 7),
  "UID" uuid NOT NULL,
  "FID" uuid NOT NULL,
  CONSTRAINT "Pegar_Emprestado_pkey" PRIMARY KEY ("EID"),
  CONSTRAINT "Pegar_Emprestado_FID_fkey" FOREIGN KEY ("FID") REFERENCES "Copia_Fisica"("FID"),
  CONSTRAINT "Pegar_Emprestado_UID_fkey" FOREIGN KEY ("UID") REFERENCES "Usuarios"("UID")
);

CREATE TABLE "Comentarios" (
  "UID" uuid NOT NULL DEFAULT gen_random_uuid(),
  "LID" uuid NOT NULL DEFAULT gen_random_uuid(),
  "descricao" text NOT NULL,
  "nota" bigint,
  CONSTRAINT "Comentarios_pkey" PRIMARY KEY ("UID","LID"),
  CONSTRAINT "Comentarios_UID_fkey" FOREIGN KEY ("UID") REFERENCES "Usuarios"("UID"),
  CONSTRAINT "Comentarios_LID_fkey" FOREIGN KEY ("LID") REFERENCES "Livros"("LID")
);

CREATE TABLE "Lista" (
  "LID" uuid NOT NULL DEFAULT gen_random_uuid(),
  "UID" uuid NOT NULL DEFAULT gen_random_uuid(),
  CONSTRAINT "Lista_pkey" PRIMARY KEY ("LID", "UID"),
  CONSTRAINT "Lista_UID_fkey" FOREIGN KEY ("UID") REFERENCES "Usuarios"("UID"),
  CONSTRAINT "Lista_LID_fkey" FOREIGN KEY ("LID") REFERENCES "Livros"("LID")
);

CREATE TABLE "Ebook" (
  "conteudo" text NOT NULL,
  "LID" uuid NOT NULL DEFAULT gen_random_uuid(),
  CONSTRAINT "Ebook_pkey" PRIMARY KEY ("conteudo"),
  CONSTRAINT "Ebook_LID_fkey" FOREIGN KEY ("LID") REFERENCES "Livros"("LID")
);

CREATE TABLE "Fila_Emprestimo" (
  "UID" uuid NOT NULL DEFAULT gen_random_uuid(),
  "Data" date DEFAULT now(),
  "LID" uuid NOT NULL,
  CONSTRAINT "Fila_Emprestimo_pkey" PRIMARY KEY ("UID", "LID"),
  CONSTRAINT "Fila_Emprestimo_UID_fkey" FOREIGN KEY ("UID") REFERENCES "Usuarios"("UID"),
  CONSTRAINT "Fila_Emprestimo_LID_fkey" FOREIGN KEY ("LID") REFERENCES "Livros"("LID")
);

CREATE TABLE "Fila_Tinder" (
  "UID" uuid NOT NULL DEFAULT gen_random_uuid(),
  "genero" character varying NOT NULL,
  "preferencia" character varying,
  CONSTRAINT "Fila_Tinder_pkey" PRIMARY KEY ("UID"),
  CONSTRAINT "Fila_Tinder_UID_fkey" FOREIGN KEY ("UID") REFERENCES "Usuarios"("UID")
);

CREATE TABLE "Match" (
  "pessoa1" uuid NOT NULL DEFAULT gen_random_uuid(),
  "pessoa2" uuid NOT NULL DEFAULT gen_random_uuid(),
  "dia" timestamp with time zone,
  "sala" bigint,
  CONSTRAINT "Match_pkey" PRIMARY KEY ("pessoa1", "pessoa2"),
  CONSTRAINT "Match_pessoa1_fkey" FOREIGN KEY ("pessoa1") REFERENCES "Usuarios"("UID"),
  CONSTRAINT "Match_pessoa2_fkey1" FOREIGN KEY ("pessoa2") REFERENCES "Usuarios"("UID")
);

CREATE TABLE "Erro_Sugestao" (
  "RID" uuid NOT NULL DEFAULT gen_random_uuid(),
  "UID" uuid NOT NULL DEFAULT gen_random_uuid(),
  "descricao" text NOT NULL,
  CONSTRAINT "Erro_Sugestao_pkey" PRIMARY KEY ("RID"),
  CONSTRAINT "Erro_Sugestao_UID_fkey" FOREIGN KEY ("UID") REFERENCES "Usuarios"("UID")
);

CREATE EXTENSION IF NOT EXISTS pg_trgm;
