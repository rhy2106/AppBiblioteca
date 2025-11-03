import { StyleSheet } from "react-native";

const cor_letra = 'black';
const cor_fundo = '#f0edeb';
const cor_botao = '#565656';
const cor_selecionado = '#e38652';
const cor_nao_selecionado = cor_botao;


const estilos = StyleSheet.create({
	container:{
		backgroundColor: cor_fundo,
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'top',
	},
	inline:{
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		margin: 15,
	},
	scroll:{
		borderColor: cor_letra,
		backgroundColor: "#e38652",
		marginTop: 100,
		height: 600,
		borderTopLeftRadius: 80,
		borderTopRightRadius: 80
	},
	box:{
		width: "90%",
		marginLeft: 12,
		borderWidth: 2,
		borderColor: cor_fundo,
		borderRadius: 10,
		height: 100,
		justifyContent: 'center',
		paddingLeft: 3,
		textAlign: "center",
		marginTop: -5,
	},
	scroll_item:{
		margin: 6,
		padding: 5,
		flexGrow: 0,
	},
	titulo:{
		color: "#e38652",
		fontSize: 20,
		margin: 15,
		fontWeight: "bold",
		alignSelf: "center",
		marginBottom:15
	},
	titulo2:{
		color: "white",
		fontSize: 20,
		margin: 15,
		fontWeight: "bold",
		alignSelf: "center",
		marginBottom: -2
	},
	linha:{
		width: "90%",
		borderTopWidth: 1,
		borderColor: "#e38652",
		alignSelf: "center",
		marginBottom: 30
	},
	comentario:{
		color: "cor_letra",
		width: '100%',
		backgroundColor: "white",
		borderRadius: 30,
		paddingLeft: 10,
		fontSize: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
		
	},
	botao:{
		marginRight: 'auto',
		marginLeft: 'auto',
		backgroundColor: "white",
		width: "60%",
		height: 45,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 40,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
	},
	botao3:{
		color: cor_letra,
		height: 40,
		width: "40%",
		alignItems: "center",
		alignSelf: "center",
		marginTop: -5,
		borderRadius: 15,
		backgroundColor: "white",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
		borderWidth: 2,
		borderColor: "#e38652",
	},
	botao4:{
		marginTop: -10,
		marginBottom: 36
	},
	botao2:{
		position: "aboslute",
		width: "30%",
		height: 30,
		bottom: 100,
		left: 230,
		backgroundColor: cor_botao,
		color: cor_letra,
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#e38652",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
		flexDirection:  "row",
		paddingRight: 15,
	},
	texto:{
		marginTop: 'auto',
		marginBottom: 'auto',
		color: "#e38652",
		fontWeight: "bold",
		fontSize: 16
	},
	texto4:{
		marginTop: 'auto',
		marginBottom: 'auto',
		color: "#e38652",
		fontSize: 14
	},
	texto2:{
		marginTop: 'auto',
		marginBottom: 'auto',
		color: "white",
		fontWeight: "bold",
		fontSize: 15
	},
	texto3:{
		marginTop: 'auto',
		marginBottom: 'auto',
		color: "#e38652",
		fontWeight: "bold",
		fontSize: 15
	},
	row:{
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 5
	}
});

export { estilos };
