import { StyleSheet } from "react-native";

const cor_letra = '#4d4a49';
const cor_fundo = '#f0edeb';
const cor_botao = '#565656';
const cor_selecionado = '#d65c15ff';
const cor_nao_selecionado = "#e38652";

const estilos = StyleSheet.create({
	container:{
		backgroundColor: cor_fundo,
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'top',
	},
	linha:{
		width: "95%",
		borderTopWidth: 1,
		borderColor: "white",
		alignSelf: "center",
		position: "absolute",
		top: 43,
	},
	inline:{
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		margin: 15,
	},
	inline2:{
		flexDirection: 'column',
		margin: 15,
	},
	titulo:{
		color: "white",
		fontWeight: "bold",
		position:"absolute",
		fontSize: 25,
		marginTop: 5,
	},
	texto:{
		marginTop: 'auto',
		marginBottom: 'auto',
		color: cor_letra,
	},
	texto3:{
		color: "#e38652",
 		fontSize: 15,
		fontWeight: "bold",
	},
	input:{
		color: cor_letra,
		width: 280,
		borderRadius: 10,
		height: 40,
		backgroundColor: "white",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
		color: "#464545",
		paddingLeft: 8,
		fontSize: 15,
		marginTop: -20,
		marginLeft: -20,
		fontWeight: "bold",
	},
	botao:{
		width: "35%",
		alignItems: "center",
		alignSelf: "center",
		backgroundColor: "white",
		height: 35,
		justifyContent: "center",
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
		marginTop: 30
	},
	selecionado: {
		backgroundColor: cor_selecionado,
	},
	nao_selecionado: {
		backgroundColor: cor_nao_selecionado,
	},
	botao2:{
		width: "45%",
		alignItems: "center",
		alignSelf: "center",
		margin: -1,
		marginRight: 5,
		height: 50,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
		borderRadius: 12,
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "white",
	},
	texto2:{
		color: "white",
 		fontSize: 16,
		fontWeight: "bold"
	},
	box:{
		alignSelf: "center",
		backgroundColor: "#e38652",
		marginTop: 80,
		height: 270,
		width: "90%",
		borderRadius: 20,
		alignItems: "center",
		paddingTop: 80
	}
	
});

export { estilos };
