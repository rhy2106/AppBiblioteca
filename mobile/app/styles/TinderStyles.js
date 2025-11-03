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
		fontSize: 20,
		margin: 15,
		fontWeight: "bold"
	},
	texto:{
		marginTop: 'auto',
		marginBottom: 'auto',
		color: "white",
		fontWeight: "bold"
	},
	botao:{
		margin: 5,
		marginRight: 'auto',
		marginLeft: 'auto',
		padding: 5,
		borderWidth: 2,
		borderRadius: 10,
		backgroundColor: "white",
		borderColor: "#e38652",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
		width: "40%",
		alignItems: "center"
	},
	texto3:{
		fontWeight: "bold",
		color: "#e38652"
	},
	botao2:{
		width: 80,
		height: 30,
		alignItems: "center",
		borderRadius: 25,
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
		marginTop: -10
	},
	texto2:{
		fontWeight: "bold",
		color: "white"
	},
	selecionado: {
		backgroundColor: cor_selecionado,
	},
	nao_selecionado: {
		backgroundColor: cor_nao_selecionado,
	},
	row:{
		flexDirection: "row"
	},
	texto5:{
		color: "white",
	},
	encontro:{
		color: "white",
		fontSize: 16,
		borderBottomWidth: 1,
		borderColor: "#ccccccff",
		width: "101%"
	}
});

export { estilos };
