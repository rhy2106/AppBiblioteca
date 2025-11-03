import { StyleSheet } from "react-native";

const cor_letra = '#4d4a49';
const cor_fundo = '#f0edeb';
const cor_botao = '#565656';


const estilos = StyleSheet.create({
	container:{
		backgroundColor: cor_fundo,
		height: '100%',
		display: 'flex',
	},
	texto2:{
		fontSize: 16,
		fontWeight: "bold",
		color: "white"
	},
	container2:{
		backgroundColor: cor_fundo,
		height: '100%',
	},
	inline:{
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		margin: 15,
	},
	inline2:{
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		margin: 15,
		marginTop: -8
	},
	box:{
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		backgroundColor: cor_fundo,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20
	},
	box2:{
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		backgroundColor: "#e38652",
		justifyContent: "center",
		alignItems: "center",
		width: "90%",
		alignSelf: "center",
		borderRadius: 10,
		height: 135,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
	},
	circulo:{
		backgroundColor: "#e38652",
		width: 130,
		height: 130,
		borderRadius: 400,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
		paddingBottom: 3
	},
	texto:{
		marginTop: 'auto',
		marginBottom: 'auto',
		color: "white",
		fontSize: 14,
		marginLeft: 10
	},
	nome:{
		marginTop: 5,
		fontSize: 30,
		alignSelf: "center",
	},
	botao:{
		marginTop: 100,
		width: "80%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#e38652",
		alignSelf: "center",
		borderRadius: 30,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
	},
	linha:{
		width: "90%",
		borderTopWidth: 1,
		borderColor: "#e38652",
		alignSelf: "center",
		marginBottom: 30,
		marginTop: 30
	},
	input:{
		width: 320,
		height: 40,
		fontWeight: "bold",
		fontSize: 18,
		color: "white",
		marginLeft: 10,
	},
	linha2:{
		width: "90%",
		borderTopWidth: 1,
		borderColor: "white",
		alignSelf: "center",
		bottom: 18,
		width: "100%"
	},
});

export { estilos };
