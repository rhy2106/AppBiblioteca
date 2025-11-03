import { StyleSheet } from 'react-native';

const cor_letra = 'white';
const cor_fundo = '#f0edeb';
const cor_botao = '#565656';

const cor_header = '#202020';
const cor_tab = '#99f9e9';

const estilos = StyleSheet.create({
	container:{
		backgroundColor: cor_fundo,
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'top',
	},
	caixaLogin:{
		backgroundColor: "#e38652",
		width: "85%",
		alignSelf: "center",
		height: 400,
		justifyContent: "center",
		alignItems: "center",
		marginVertical: "auto",
		borderRadius: 15,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
		paddingBottom: 45
	},	

	inline:{
		flexDirection: 'column',
		justifyContent: 'space-around',
		margin: 15,
	},
	titulo:{
		color: cor_letra,
		textAlign: 'center',
		fontSize: 30,
		position: "absolute",
		top: "3%",
		fontWeight: "bold"
	},
	texto2:{
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
		bottom: 40,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5, 
		elevation: 5,
	},
	linha:{
		flexDirection: "row",
		marginLeft: 5
	},
	icon:{
		alignSelf:  "center"		
	}
});

export { estilos };
