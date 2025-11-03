import { StyleSheet } from "react-native";

const cor_letra = '#4d4a49';
const cor_fundo = '#f0edeb';
const cor_botao = '#565656';

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
		borderColor: "#",
		alignSelf: "center",
		marginBottom: 20
	},
	linha2:{
		width: "97%",
		borderTopWidth: 1,
		borderColor: "#eea87fff",
		alignSelf: "center",
		marginVertical: 3,
	},
	scroll:{
		margin: 10,
		borderWidth: 2,
		borderColor: "#e38652",
		backgroundColor: "cor_fundo",
		borderRadius: 9,
	},
	scroll_item:{
		margin: 6,
		padding: 5,
		backgroundColor: cor_botao,
		flexGrow: 0,
		borderRadius: 8,
		backgroundColor: "#e38652",
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
		margin: 15,
		fontWeight: "bold",
	},
	texto:{
		marginTop: 'auto',
		marginBottom: 'auto',
		color: "white",
		fontSize: 14
	},
	texto3:{
		marginTop: 'auto',
		marginBottom: 'auto',
		color: "white",
		fontSize: 14,
		fontWeight: "bold"
	},
	texto2:{
		marginTop: 'auto',
		marginBottom: 'auto',
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
	},
	input:{
		color: cor_letra,
		borderWidth: 2,
		borderColor: cor_letra,
		width: '70%',
	},
});

export { estilos };
