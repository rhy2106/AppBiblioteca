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
	let result;
	if( pesquisa == "" ){
		result = await sql`
			SELECT *
				FROM "Livros"
			LIMIT 50;
		`;
	}else{
		result = await sql`
		  SELECT *
			  FROM "Livros"
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
			res.status(400).json({ success: false, mensagem: 'Genero já cadastrado!' });
		} else{
			res.status(500).json({ success: false, mensagem: err.message });
		}
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

