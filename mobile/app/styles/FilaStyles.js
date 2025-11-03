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
		borderRadius: 10,
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
		marginVertical: 10,
	},
	texto:{
		marginTop: 'auto',
		marginBottom: 'auto',
		color: cor_letra,
	},
	texto2:{
		color: "white",
		fontSize: 13
	},
	texto3:{
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
		borderBottomWidth: 1,
		borderColor: "#eea87fff",
		marginBottom: 3
	},
	texto4:{
		color: "white",
		fontSize: 13,
		fontWeight: "bold"
	},
	linha:{
		width: "90%",
		borderTopWidth: 1,
		borderColor: "#e38652",
		alignSelf: "center",
		marginBottom: 10
	},
	linha2:{
		width: "90%",
		borderTopWidth: 1,
		borderColor: "#e38652",
		alignSelf: "center",
		marginTop: 10
	},
});

export { estilos };
