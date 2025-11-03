import { StyleSheet } from "react-native";

const cor_letra = 'white';
const cor_fundo = '#f0edeb';
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
	
	container3:{
		flex:1,
	},
	inline:{
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		margin: 15,
	},
	inline2:{
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		margin: 15,
		marginTop: -1
	},
	scroll:{
		margin: 10,
		marginBottom: 4,
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
	titulo:{
		color: cor_letra,
		textAlign: 'center',
		fontSize: 30,
		marginVertical: "10",
		marginBottom: 20 
	},
	titulo2:{
		color: "white",
		textAlign: 'center',
		fontSize: 18,
		marginVertical: "10",
		marginBottom: 20,
		fontWeight: "bold"
	},
	texto:{
		marginTop: 'auto',
		marginBottom: 'auto',
		color: cor_letra,
		fontWeight: "bold",
		fontSize: 16,
		marginLeft: 4,
	},
	texto4:{
		marginTop: 'auto',
		marginBottom: 'auto',
		color: "#e38652",
		fontWeight: "bold",
		fontSize: 16,
		marginLeft: 4,
		
	},
	texto6:{
		marginTop: 'auto',
		marginBottom: 'auto',
		color: "white",
	},
	texto7:{
		color: "#979797ff",
		alignSelf: "center",
	},
	input:{
		color: cor_letra,
		width: '66%',
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
		fontSize: 12,
		marginTop: -20,
		marginLeft: -10,
		fontWeight: "bold"
	},
	botao4:{
		padding: 5,
		backgroundColor: "white",
		color: cor_letra,
		borderRadius: 30,
		width: 100,
		alignItems: "center",
		marginLeft: 8,
		paddingLeft: -3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
		marginTop: -17,
		height: 34
	},
	input2:{
		borderWidth: 1,
		borderColor: cor_letra,
		width: '90%',
		height: 40,
		backgroundColor: "white",
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
		fontSize: 14,
		justifyContent: "center",
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
		borderColor: "white"
	},
	texto2:{
		color: cor_letra,
 		fontSize: 16,
		fontWeight: "bold"
	},
	botao:{
		borderWidth: 2,
		width: "20%",
		alignItems: "center",
		alignSelf: "center",
		margin: -1
	},
	botao3:{
		width: "80%",
		alignItems: "center",
		alignSelf: "center",
		marginTop: 30,
		backgroundColor: "white",
		height: 45,
		justifyContent: "center",
		borderRadius: 30,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
	},
	texto3:{
		color: "#e38652",
 		fontSize: 17,
		fontWeight: "bold",
	},
	selecionado: {
		backgroundColor: cor_selecionado,
	},
	nao_selecionado: {
		backgroundColor: cor_nao_selecionado,
	},
	box1:{
		backgroundColor: "#e38652",
		width: "85%",
		alignSelf: "center",
		height: 480,
		marginVertical: "auto",
		borderRadius: 15,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
		marginTop: 8
	},
	box2:{
		backgroundColor: "#e38652",
		width: "90%",
		alignSelf: "center",
		height: 100,
		marginVertical: "auto",
		borderRadius: 15,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
		marginTop: 2
	}
});

export { estilos };
