import { StyleSheet } from "react-native";

const cor_letra = '#e38652';
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
	scroll:{
		margin: 10,
		borderWidth: 2,
		borderColor: "#e38652",
		borderRadius: 3,
	},
	scroll_item_inline:{
		margin: 6,
		borderWidth: 1,
		borderColor: cor_letra,
		backgroundColor: "#e38652",
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderRadius: 6,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
	},
	scroll_button:{
		margin: 5,
		width:'70%',
		padding: 4,
		color: cor_letra,
	},
	texto3:{
		marginTop: 'auto',
		marginBottom: 'auto',
		color: "white",
		marginRight: 3
	},
	scroll_remove_button:{
		margin: 5,
		width:'9%',
		height: 30,
		padding: 'auto',
		borderColor: cor_letra,
		backgroundColor: "#9a1a1a",
		color: cor_letra,
		justifyContent:  "center",
		alignItems: "center",
		borderRadius: 5,
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
		fontWeight: "bold", 
	},
});

export { estilos };
