import { StyleSheet } from "react-native";

const cor_letra = 'white';
const cor_fundo = '#f0edeb';

const estilos = StyleSheet.create({
	container:{
		backgroundColor: cor_fundo,
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'top',
	},
	caixa:{
		backgroundColor: "#e38652",
		width: "85%",
		alignSelf: "center",
		height: 480,
		justifyContent: "center",
		alignItems: "center",
		marginVertical: "auto",
		borderRadius: 15,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
	},	

	inline:{
		flexDirection: 'column',
		justifyContent: 'space-around',
		margin: 15,
	},
	inline2:{
		flexDirection: 'row',
		justifyContent: 'space-between', 
		width: 280,
	},
	titulo:{
		color: cor_letra,
		textAlign: 'center',
		fontSize: 30,
		position: "absolute",
		top: "3%",
		fontWeight: "bold"
	},
	texto3:{
		marginTop: 'auto',
		marginBottom: 'auto',
		color: "#e38652",
		fontWeight: "bold",
		fontSize: 18
	},
	texto:{
		marginTop: 'auto',
		marginBottom: 'auto',
		color: "white",
		fontWeight: "bold",
		fontSize: 16
	},
	texto2:{
		marginTop: 'auto',
		marginBottom: 'auto',
		color: "white",
		fontWeight: "bold",
		fontSize: 13
	},
	input:{
		borderWidth: 2,
		borderColor: cor_letra,
		width: 250,
		borderRadius: 10,
		backgroundColor: "white",
		fontSize: 15,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
	},
	botao:{
		position: "absolute",
		marginRight: 'auto',
		marginLeft: 'auto',
		padding: 5,
		color: cor_letra,
		width: 200,
		height: 50,
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		bottom: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
	},
	botao3:{
		marginRight: 'auto',
		marginLeft: 'auto',
		color: cor_letra,
		width: 90,
		height: 25,
		borderRadius: 3,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		bottom: 40,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
		marginTop: 50,
	},
	linha:{
		flexDirection: "row",
	},
	icon:{
		alignSelf:  "center",	
		marginRight:5,
		marginLeft: 5
	},
	selecionado: {
		backgroundColor: "#d65c15ff",
	},
	nao_selecionado: {
		backgroundColor: "white",
	},
});

export {estilos};
