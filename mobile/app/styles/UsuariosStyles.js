import { StyleSheet } from "react-native";

const cor_letra = 'white';
const cor_fundo = '#f0edeb';
const cor_botao = '#565656';
const cor_selecionado = '#5555aa';
const cor_nao_selecionado = cor_botao;


const estilos = StyleSheet.create({
	container:{
		backgroundColor: cor_fundo,
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'top',
	},
	texto3:{
		marginTop: 'auto',
		marginBottom: 'auto',
		color: cor_letra,
		marginRight: 3
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
		borderColor: "#e38652",
		backgroundColor: "cor_fundo",
		borderRadius: 3,
	},
	scroll_item:{
		margin: 6,
		padding: 5,
		backgroundColor: "#e38652",
		flexGrow: 0,
		borderRadius: 6,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
	},
	linha:{
		width: "95%",
		borderTopWidth: 1,
		borderColor: "#e38652",
		alignSelf: "center",
		marginVertical: 8
	},
	titulo:{
		color: "#424141ff",
		textAlign: 'center',
		fontSize: 30,
		marginVertical: 5,
		fontWeight: "bold",
		
	},
	texto:{
		marginTop: 'auto',
		marginBottom: 'auto',
		color: cor_letra,
		fontWeight: "bold"
	},
	input:{
		color: cor_letra,
		width: '66%',
		borderRadius: 10,
		backgroundColor: "white",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
		color: "#464545",
		fontWeight: "bold",
		paddingLeft: 8,
		borderWidth: 2,
		borderColor: "#e38652"
	},
	botao:{
		margin: 5,
		marginRight: 'auto',
		padding: 5,
		backgroundColor: "#e38652",
		color: cor_letra,
		borderRadius: 30,
		width: 110,
		alignItems: "center",
		marginLeft: 8,
		paddingLeft: -3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
	},
	texto2:{
		marginTop: 'auto',
		marginBottom: 'auto',
		color: "white",
		fontWeight: "bold"
	},
	selecionado: {
		backgroundColor: cor_selecionado,
	},
	nao_selecionado: {
		backgroundColor: cor_nao_selecionado,
	},
});

export { estilos };
