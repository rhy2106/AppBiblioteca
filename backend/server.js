import express from 'express';
import sql from './db.js';

const app = express();
app.use(express.json());
const PORT = 3000;

app.post('/login', async (req,res) => {
	const { email, senha } = req.body;
	try{
		const result = await sql`
			SELECT *
			FROM "Usuarios"
			WHERE email = ${email}`
		if(result.length === 0 || result[0].senha != senha){
			res.status(401).json({mensagem: "Usuario não encontrado"});
		}
		res.json({data: result[0]});
	} catch(err){
		res.status(500).json({ success: false, mensagem: err.message });
	}
});

app.post('/cadastrar',async (req,res) => {
	const { usuario, email, senha, genero } = req.body;
	console.log(usuario,email,senha,genero);
	try{
		const result = await sql`
			INSERT INTO "Usuarios" (usuario, email, senha, genero)
			VALUES (${usuario}, ${email}, ${senha}, ${genero})
		`;
		res.json({success:true, usuario: {usuario, email} });
	} catch(err){
		if(err.code === '23505'){ // PostgreSQL unique violation
			res.status(400).json({ success: false, mensagem: 'Email já cadastrado!' });
		} else{
			res.status(500).json({ success: false, mensagem: err.message });
		}
	}
});

app.post('/pesquisa',async (req,res) => {
	const { pesquisa } = req.body;
	console.log(pesquisa);
	try{
		let result;
		if( pesquisa == "" ){
			result = await sql`
				SELECT
					"Livros"."LID" AS "LID",
					"Livros".nome AS nome,
					"Livros".autor AS autor,
					"Livros".genero AS genero,
					COALESCE(q.quantidade,0) AS quantidade,
					COALESCE(d.disponiveis,0) AS disponiveis,
					COALESCE(a.nota, 0) AS nota
				FROM "Livros"
					LEFT JOIN ( 
						SELECT "LID", COUNT(*) AS quantidade
							FROM "Copia_Fisica"
						GROUP BY "LID"
					) AS q
						ON "Livros"."LID" = q."LID"
					LEFT JOIN ( 
						SELECT "LID", COUNT(*) AS disponiveis
							FROM "Copia_Fisica"
						WHERE "Emprestado" = false
						GROUP BY "LID"
					) AS d
						ON "Livros"."LID" = d."LID"
					LEFT JOIN (
						SELECT "LID", ROUND(SUM(nota)/COUNT("LID"),2) AS nota
							FROM "Comentarios"
						GROUP BY "LID"
					) AS a
						ON "Livros"."LID" = a."LID"
				LIMIT 50;
			`;
		}else{
			result = await sql`
				SELECT
					"Livros"."LID" AS "LID",
					"Livros".nome AS nome,
					"Livros".autor AS autor,
					"Livros".genero AS genero,
					COALESCE(q.quantidade,0) AS quantidade,
					COALESCE(d.disponiveis,0) AS disponiveis,
					COALESCE(a.nota, 0) AS nota
				FROM "Livros"
					LEFT JOIN ( 
						SELECT "LID", COUNT(*) AS quantidade
							FROM "Copia_Fisica"
						GROUP BY "LID"
					) AS q
						ON "Livros"."LID" = q."LID"
					LEFT JOIN ( 
						SELECT "LID", COUNT(*) AS disponiveis
							FROM "Copia_Fisica"
						WHERE "Emprestado" = false
						GROUP BY "LID"
					) AS d
						ON "Livros"."LID" = d."LID"
					LEFT JOIN (
						SELECT "LID", ROUND(SUM(nota)/COUNT("LID"),2) AS nota
							FROM "Comentarios"
						GROUP BY "LID"
					) AS a
						ON "Livros"."LID" = a."LID"
				WHERE nome % ${pesquisa}
					OR autor % ${pesquisa}
					OR genero % ${pesquisa}
				ORDER BY GREATEST(
					similarity(nome, ${pesquisa}),
					similarity(genero, ${pesquisa}),
					similarity(autor, ${pesquisa})
				) DESC
				LIMIT 50;
			`;
		}
		res.json(result);
		console.log(result);
	} catch(err){
		res.status(500).json({ success: false, mensagem: err.message });
	}
});

app.post('/buscar',async (req,res) => {
	const { pesquisa } = req.body;
	let result;
	try{
		if( pesquisa == "" ){
			result = await sql`
				SELECT *, COALESCE(a.atrasados, 0) AS atrasados, COALESCE(r.reservados, 0) AS reservados
				FROM "Usuarios"
					LEFT JOIN ( 
						SELECT "UID", COUNT(*) AS atrasados
							FROM "Pegar_Emprestado"
						WHERE "Prazo" < now()
						GROUP BY "UID"
					) AS a
						ON a."UID" = "Usuarios"."UID"
					LEFT JOIN ( 
						SELECT "UID", COUNT(*) AS reservados
							FROM "Fila_Emprestimo"
							GROUP BY "UID"
					) AS r
						ON r."UID" = "Usuarios"."UID"
				LIMIT 50;
			`;
		}else{
			result = await sql`
				SELECT *, COALESCE(a.atrasados, 0) AS atrasados, COALESCE(r.reservados, 0) AS reservados
				FROM "Usuarios"
					LEFT JOIN ( 
						SELECT "UID", COUNT(*) AS atrasados
							FROM "Pegar_Emprestado"
						WHERE "Prazo" < now()
						GROUP BY "UID"
					) AS a
						ON a."UID" = "Usuarios"."UID"
					LEFT JOIN ( 
						SELECT "UID", COUNT(*) AS reservados
							FROM "Fila_Emprestimo"
							GROUP BY "UID"
					) AS r
						ON r."UID" = "Usuarios"."UID"
				WHERE usuario % ${pesquisa}
					OR email % ${pesquisa}
					OR genero % ${pesquisa}
					OR "Usuarios"."UID"::text % ${pesquisa}
				ORDER BY GREATEST(
					similarity(usuario, ${pesquisa}),
					similarity(email, ${pesquisa}),
					similarity(genero, ${pesquisa}),
					similarity("Usuarios"."UID"::text, ${pesquisa})
				) DESC
				LIMIT 50;
			`;
		}
		res.json(result);
	} catch(err){
		res.status(500).json({ success: false, mensagem: err.message });
	}
});


app.post('/registrar_livro',async (req,res) => {
	const {nome, autor, genero, descricao} = req.body;
	try{
		const result = await sql`
			INSERT INTO "Livros" (nome, autor, genero, descricao)
			VALUES (${nome}, ${autor}, ${genero}, ${descricao})
		`;
		res.json({success:true, mensagem: 'Livro cadastrado' });
	} catch(err){
		if(err.code === '23505'){
			res.status(400).json({ success: false, mensagem: 'Livro já cadastrado!' });
		} else{
			res.status(500).json({ success: false, mensagem: err.message });
		}
	}
});

app.post('/registrar_livro_fisico', async (req,res) => {
	const {livro} = req.body;
	try{
		const result = await sql`
			INSERT INTO "Copia_Fisica" ("LID")
			VALUES (${livro.LID}) 
			RETURNING "FID";
		`;
		res.json({success:true, mensagem: 'Livro Fisico cadastrado', FID: result[0].FID });
	} catch(err){
		if(err.code === '23505'){
			res.status(400).json({ success: false, mensagem: 'Genero já cadastrado!' });
		} else{
			res.status(500).json({ success: false, mensagem: err.message });
		}
	}
});

app.post('/registrar_autor',async (req,res) => {
	const {autor} = req.body;
	try{
		const result = await sql`
			INSERT INTO "Autor" (autor)
			VALUES (${autor})
		`;
		res.json({success:true, mensagem: 'Autor cadastrado' });
	} catch(err){
		if(err.code === '23505'){
			res.status(400).json({ success: false, mensagem: 'Autor já cadastrado!' });
		} else{
			res.status(500).json({ success: false, mensagem: err.message });
		}
	}
});

app.post('/registrar_genero', async (req,res) => {
	const {genero} = req.body;
	try{
		const result = await sql`
			INSERT INTO "Genero" (genero)
			VALUES (${genero})
		`;
		res.json({success:true, mensagem: 'Genero cadastrado' });
	} catch(err){
		if(err.code === '23505'){
			res.status(400).json({ success: false, mensagem: 'Genero já cadastrado!' });
		} else{
			res.status(500).json({ success: false, mensagem: err.message });
		}
	}
});

app.post('/fila', async (req,res) => {
	const { UID } = req.body;
	try{
		const result = await sql`
			SELECT DISTINCT nome, autor, "Livros"."LID" as "LID", posicao, COALESCE(disponiveis,0)
				FROM "Fila_Emprestimo"
				JOIN "Livros"
					ON "Livros"."LID" = "Fila_Emprestimo"."LID"
				JOIN (
					SELECT
						"UID",
						"LID",
						ROW_NUMBER() OVER (PARTITION BY "LID" ORDER BY "Data" ASC) AS posicao
					FROM "Fila_Emprestimo"
					WHERE "UID" = ${UID}
				) AS p
					ON p."UID" = "Fila_Emprestimo"."UID"
						AND p."LID" = "Fila_Emprestimo"."LID"
				LEFT JOIN (
					SELECT "LID", COUNT(*) AS disponiveis
					FROM "Copia_Fisica"
					WHERE "Emprestado" = false
					GROUP BY "LID"
				) AS d
					ON d."LID" = "Fila_Emprestimo"."LID"
			WHERE "Fila_Emprestimo"."UID" = ${UID}
		`;
		res.json({success:true, data: result });
	} catch(err){
		res.status(500).json({ success: false, mensagem: err.message });
	}
});

app.post('/emprestados', async (req,res) => {
	const { UID } = req.body;
	console.log(UID);
	try{
		const result = await sql`
			SELECT *
				FROM "Pegar_Emprestado"
				JOIN "Copia_Fisica"
					ON "Pegar_Emprestado"."FID" = "Copia_Fisica"."FID"
				JOIN "Livros"
					ON "Copia_Fisica"."LID" = "Livros"."LID"
			WHERE "UID" = ${UID}
				AND "Devolucao" IS NULL
			ORDER BY "Emprestimo" ASC
		`;
		res.json({success:true, data: result });
	} catch(err){
		res.status(500).json({ success: false, mensagem: err.message });
	}
});

app.post('/historico', async (req,res) => {
	const { UID } = req.body;
	console.log(UID);
	try{
		const result = await sql`
			SELECT 
				"Pegar_Emprestado"."FID" AS "FID",
				"Livros"."LID" AS "LID",
				"nome",
				"autor",
				"Prazo",
				"Emprestimo",
				COALESCE("Devolucao", '2000-01-01'::date) AS "Devolucao"
				FROM "Pegar_Emprestado"
				JOIN "Copia_Fisica"
					ON "Pegar_Emprestado"."FID" = "Copia_Fisica"."FID"
				JOIN "Livros"
					ON "Copia_Fisica"."LID" = "Livros"."LID"
			WHERE "UID" = ${UID}
			ORDER BY "Emprestimo" ASC
		`;
		res.json({success:true, data: result });
	} catch(err){
		res.status(500).json({ success: false, mensagem: err.message });
	}
});

app.post('/reservar', async (req,res) => {
	const { LID, UID } = req.body;
	console.log( LID,UID);
	try{
		const result = await sql`
			INSERT INTO "Fila_Emprestimo" ("LID", "UID")
			VALUES (${LID}, ${UID})
		`;
		res.json({success:true, mensagem: 'Usuario adicionado a fila de espera' });
	} catch(err){
		if(err.code === '23505'){
			res.status(400).json({ success: false, mensagem: 'o usuario já está na fila de espera!' });
		} else{
			res.status(500).json({ success: false, mensagem: err.message });
		}
	}
});

app.post('/emprestar', async (req,res) => {
	const { UID, FID } = req.body;
	console.log(FID, UID);
	try{
		const id = await sql`
			SELECT *
				FROM "Copia_Fisica"
				WHERE "FID" = ${FID}
		`;
		console.log(id);
		const LID = id[0].LID;
		const fila = await sql`
			SELECT DISTINCT nome, autor, "Livros"."LID" as "LID", posicao, COALESCE(disponiveis,0)
				FROM "Fila_Emprestimo"
				JOIN "Livros"
					ON "Livros"."LID" = "Fila_Emprestimo"."LID"
				JOIN (
					SELECT
						"UID",
						"LID",
						ROW_NUMBER() OVER (PARTITION BY "LID" ORDER BY "Data" ASC) AS posicao
					FROM "Fila_Emprestimo"
					WHERE "UID" = ${UID}
				) AS p
					ON p."UID" = "Fila_Emprestimo"."UID"
						AND p."LID" = "Fila_Emprestimo"."LID"
				LEFT JOIN (
					SELECT "LID", COUNT(*) AS disponiveis
						FROM "Copia_Fisica"
					WHERE "Emprestado" = false
					GROUP BY "LID"
				) AS d
					ON d."LID" = "Fila_Emprestimo"."LID"
			WHERE "Fila_Emprestimo"."UID" = ${UID}
				AND "Fila_Emprestimo"."LID" = ${LID}
		`;
		console.log(fila);
		if(fila.length == 0){
			res.json({success:false, mensagem: 'Não foi possivel emprestar o livro.\nLivro reservado por outra pessoa, ou Usuario não fez reserva.' });
		} else if(fila[0].posicao <= fila[0].disponiveis){
			await sql.begin(async tx => {
				await tx`
					INSERT INTO "Pegar_Emprestado" ("UID", "FID")
					VALUES (${UID}, ${FID});
				`;
				await tx`
					UPDATE "Copia_Fisica"
						SET "Emprestado" = TRUE
					WHERE "FID" = ${FID};
				`;
				await tx`
					UPDATE "Usuarios"
						SET pontuacao = pontuacao + 1
					WHERE "UID" = ${UID};
				`;
				await tx`
					DELETE FROM "Fila_Emprestimo"
					WHERE "UID" = ${UID}
						AND "LID" = ${LID};
				`;
			});
			res.json({success:true, mensagem: 'Livro emprestado' });
		}
	} catch(err){
		res.status(500).json({ success: false, mensagem: err.message });
	}
});

app.post('/devolver', async (req,res) => {
	const { UID,FID } = req.body;
	try{
		const result = await sql.begin(async tx => {
			await tx`
				UPDATE "Copia_Fisica"
				SET "Emprestado" = FALSE
				WHERE "FID" = ${FID};
			`;
			return await tx`
				UPDATE "Pegar_Emprestado"
				SET "Devolucao" = now()
				WHERE "UID" = ${UID}
					AND "FID" = ${FID}
					AND "Devolucao" IS NULL
				RETURNING "Prazo", DATE_PART('day', now() - "Prazo") AS dias_atraso;
			`;
		});
		if (result.length === 0) {
			return res.json({
				success: false,
				mensagem: 'Nenhum empréstimo ativo encontrado para esse livro.',
			});
		}
		const atraso = result[0].dias_atraso;
		const mensagem = ( atraso > 0
			? `Livro devolvido com ${atraso} dia(s) de atraso.`
			: 'Livro devolvido dentro do prazo.'
		);
		return res.json({
			success: true,
			atraso,
			mensagem,
		});
	} catch(err){
		res.status(500).json({ success: false, mensagem: err.message });
	}
});

app.post('/lista', async (req,res) => {
	const { UID } = req.body;
	console.log(UID);
	try{
		const result = await sql`
			SELECT 
				"Livros"."LID" AS "LID",
				"Livros".nome AS nome,
				"Livros".autor AS autor,
				"Livros".genero AS genero,
				COALESCE(a.nota, 0) AS nota
			FROM "Lista"
				JOIN "Livros"
					ON "Livros"."LID" = "Lista"."LID"
				LEFT JOIN (
					SELECT "LID", ROUND(SUM(nota)/COUNT("LID"),2) AS nota
						FROM "Comentarios"
					GROUP BY "LID"
				) AS a
					ON "Livros"."LID" = a."LID"
			WHERE "Lista"."UID" = ${UID}
		`;
		res.json(result);
	} catch(err){
			res.status(500).json({ success: false, mensagem: err.message });
	}
});

app.post('/add_lista', async (req,res) => {
	const { LID, UID } = req.body;
	try{
		const result = await sql`
			INSERT INTO "Lista" ("LID", "UID")
			VALUES (${LID}, ${UID})
		`;
		res.json({success:true, mensagem: 'Livro adicionado com sucesso' });
	} catch(err){
		if(err.code === '23505'){
			res.status(400).json({ success: false, mensagem: 'Livro já está na lista' });
		} else{
			res.status(500).json({ success: false, mensagem: err.message });
		}
	}
});

app.post('/remover_lista', async (req,res) => {
	const { LID, UID } = req.body;
	try{
		const result = await sql`
			DELETE FROM "Lista"
				WHERE "UID" = ${UID}
					AND "LID" = ${LID}
		`;
		res.json({success:true, mensagem: 'Livro removido com sucesso' });
	} catch(err){
		if(err.code === '23505'){
			res.status(400).json({ success: false, mensagem: 'Livro já está na lista' });
		} else{
			res.status(500).json({ success: false, mensagem: err.message });
		}
	}
});

app.post('/avaliacoes', async (req,res) => {
	const {LID} = req.body;
	try{
		const result = await sql`
			SELECT *
				FROM "Comentarios"
			JOIN "Usuarios"
				ON "Comentarios"."UID" = "Usuarios"."UID"
			WHERE "LID" = ${LID}
		`;
		res.json({result});
	} catch(err){
		res.status(500).json({ success: false, mensagem: err.message });
	}
});

app.post('/comentar', async (req,res) => {
	const { LID, UID, comentario, nota } = req.body;
	console.log( LID,UID,comentario,nota);
	try{
		const result = await sql`
			INSERT INTO "Comentarios" ("LID", "UID", descricao, nota)
			VALUES (${LID}, ${UID}, ${comentario}, ${nota})
		`;
		res.json({success:true, mensagem: 'Comentario enviado' });
	} catch(err){
		if(err.code === '23505'){
			res.status(400).json({ success: false, mensagem: 'Comentario ja existe!' });
		} else{
			res.status(500).json({ success: false, mensagem: err.message });
		}
	}
});

app.post('/fila_tinder', async (req,res) => {
	const { UID, genero, preferencia } = req.body;
	try{
		const result = await sql.begin(async tx => {
			const fila = await tx`
				SELECT *
					FROM "Fila_Tinder"
				WHERE genero = ${preferencia}
					AND preferencia = ${genero}
			`;
			if(fila.length > 0){
				const uid = fila[0].UID;
				await tx`
					DELETE FROM "Fila_Tinder"
						WHERE "UID" = ${uid}
				`;
				await tx`
					INSERT INTO "Match" ( pessoa1, pessoa2, dia, sala )
					VALUES ( ${UID}, ${uid}, NOW() + INTERVAL '2 days', ${Math.floor(Math.random()*10)%10} )
				`;
				await tx`
					UPDATE "Usuarios"
						SET pontuacao = pontuacao - 5
					WHERE "UID" = ${UID}
				`;
				return 1;
			} else{
				await tx`
					INSERT INTO "Fila_Tinder" ( "UID", genero, preferencia )
					VALUES ( ${UID}, ${genero}, ${preferencia} )
				`;
				return 0;
			}
		});
		console.log(result);
		if(result === 1)
			res.json({success: true, message: "Match encontrado"});
		else
			res.json({success:true, message: "Procurando Match"});
	}catch(err){
		res.status(500).json({ success: false, mensagem: err.message });
	}
});

app.post('/encontros', async (req,res) => {
	const { UID } = req.body;
	try{
		const result = await sql.begin(async tx => {
			const matchs_antigos = await tx`
				SELECT *
					FROM "Match"
					JOIN "Usuarios"
						ON ("Match"."pessoa1" = "Usuarios"."UID"
								AND "Match"."pessoa1" != ${UID})
							OR ("Match"."pessoa2" = "Usuarios"."UID"
								AND "Match"."pessoa2" != ${UID})
				WHERE "pessoa1" = ${UID}
					OR "pessoa2" = ${UID}
			`;
			const procurando = await tx`
				SELECT *
					FROM "Fila_Tinder"
				WHERE "UID" = ${UID}
			`;
			return { matchs_antigos, procurando:procurando.length > 0 };
		});
		console.log(result);
		res.json({data: result.matchs_antigos, procurando: result.procurando});
	}catch(err){
		res.status(500).json({ success: false, mensagem: err.message });
	}
});

app.get('/', async (req, res) => {
  try {
    const result = await sql`SELECT 1 as ok`;
    res.json({ mensagem: 'Conexão backend OK!', result });
  } catch (err) {
    console.error('Erro ao conectar no banco:', err);
    res.status(500).json({ mensagem: 'Erro ao conectar no banco', erro: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

