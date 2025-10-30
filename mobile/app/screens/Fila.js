import React from "react";
import { View, Text, TextInput, Button, ScrollView, Alert, Pressable} from "react-native";
import { ip } from "../model/";

class Fila extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			...this.props.route.params,
			resultados: [],
		}
	}
	componentDidMount(){
		const {navigation} = this.props;
		this.livros();
		this.unsubscribeFocus = navigation.addListener("focus", () => {
			this.livros();
		});
	}
	componentWillUnmount() {
		if (this.unsubscribeFocus) {
			this.unsubscribeFocus();
		}
	}

	async livros(){
		const {UID} = this.state.usuario;
		try{
			const res = await fetch(`http://${ip}/fila`,{
				method: "POST",
				headers: {"Content-Type":"application/json"},
				body:JSON.stringify({ UID }),
			});
			const { data } = await res.json();
			this.setState({ resultados: data });
		}catch(err){
			Alert.alert("Erro ao connectar com o banco de dados");
		}
	}

	render(){
		return(
			<View>
				<ScrollView style={{ marginTop: 10 }}>
					{this.state.resultados.map((livro,index)=>(
						<View key={index}>
							<Text> {livro.nome} </Text>
							<Text> {livro.autor} </Text>
							<Text>
								{ livro.disponiveis >= livro.posicao ? "Disponivel" : "Indisponivel"}
							</Text>
						</View>
					))}
				</ScrollView>
			</View>	
		);
	}
}

export default Fila;

