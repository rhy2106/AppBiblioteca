import { StyleSheet } from 'react-native';

const cor_letra = 'white';
const cor_fundo = '#363636';
const cor_botao = '#565656';
const cor_selecionado = '#5555aa';
const cor_nao_selecionado = cor_botao;

const cor_header = '#202020';
const cor_tab = '#99f9e9';

const estilos = StyleSheet.create({
	container:{
		backgroundColor: cor_fundo,
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'top',
	},
	container2:{
		backgroundColor: cor_fundo,
		height: '100%',
	},
	container3:{
		flex:1,
	},
	inline:{
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		margin: 15,
	},
	scroll:{
		margin: 10,
		borderWidth: 2,
		borderColor: cor_letra,
		backgroundColor: cor_fundo,
	},
	scroll_item:{
		margin: 6,
		padding: 5,
		borderWidth: 1,
		borderColor: cor_letra,
		backgroundColor: cor_botao,
		flexGrow: 0,
	},
	scroll_item_inline:{
		margin: 6,
		borderWidth: 1,
		borderColor: cor_letra,
		backgroundColor: cor_botao,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	scroll_button:{
		margin: 5,
		width:'70%',
		padding: 5,
		backgroundColor: cor_botao,
		color: cor_letra,
	},
	scroll_remove_button:{
		margin: 5,
		width:'20%',
		padding: 'auto',
		borderWidth: 2,
		borderColor: cor_letra,
		backgroundColor: cor_botao,
		color: cor_letra,
	},
	titulo:{
		color: cor_letra,
		textAlign: 'center',
		fontSize: 30,
		margin: 15,
	},
	texto:{
		marginTop: 'auto',
		marginBottom: 'auto',
		color: cor_letra,
	},
	input:{
		color: cor_letra,
		borderWidth: 2,
		borderColor: cor_letra,
		width: '70%',
	},
	comentario:{
		color: cor_letra,
		borderWidth: 2,
		borderColor: cor_letra,
		width: '100%',
	},
	botao:{
		margin: 5,
		marginRight: 'auto',
		marginLeft: 'auto',
		padding: 5,
		borderWidth: 2,
		borderColor: cor_letra,
		backgroundColor: cor_botao,
		color: cor_letra,
	},
	selecionado: {
		backgroundColor: cor_selecionado,
	},
	nao_selecionado: {
		backgroundColor: cor_nao_selecionado,
	},
});

export { estilos, cor_header, cor_letra, cor_tab };
