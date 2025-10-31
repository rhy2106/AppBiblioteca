import React from "react";
import { View, Text, TextInput, Button, ScrollView, Alert, Pressable} from "react-native";
import { ip } from "../model/";

class Lista extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			...this.props.route.params,
			resultados: [],
		}
	}

	componentDidMount(){
		const {navigation} = this.props;
		this.lista();
		this.unsubscribeFocus = navigation.addListener("focus", () => {
			this.lista()
		});
	}

	componentWillUnmount() {
		if(this.unsubscribeFocus) {
			this.unsubscribeFocus();
		}
	}

	async lista(){
		const { UID } = this.state.usuario;
		console.log(UID);
		try {
			const res = await fetch(`http://${ip}/lista`,{
				method: "POST",
				headers: {"Content-Type":"application/json"},
				body:JSON.stringify({ UID }),
			});
			const resultados = await res.json();
			console.log(resultados);
			this.setState({ resultados });
		} catch(err){
			Alert.alert("Erro ao connectar com o banco de dados",err.message);
		}
	}

	async remover(livro){
		const { UID } = this.state.usuario;
		const { LID } = livro;
		try {
			const res = await fetch(`http://${ip}/remover_lista`,{
				method: "POST",
				headers: {"Content-Type":"application/json"},
				body:JSON.stringify({ UID,LID }),
			});
			this.lista();
			Alert.alert("Sucesso","Livro removido da lista!");
		} catch(err){
			Alert.alert("Erro ao connectar com o banco de dados", err.message);
		}
	}

	render(){
		return(
			<View>
				<ScrollView style={{ marginTop: 10 }}>
					{this.state.resultados.map((livro, index) => (
						<View key={index}>
							<Pressable style={{ marginBottom: 10, padding: 5, borderWidth: 1, borderColor: "#ddd" }}
								onPress={()=>this.props.navigation.navigate("Livro",{usuario:this.state.usuario,livro})}
							>
								<Text>Nome: {livro.nome}</Text>
								<Text>Autor: {livro.autor}</Text>
								<Text>Gênero: {livro.genero}</Text>
								<Text>Nota: {livro.nota}</Text>
							</Pressable>

							<Pressable
								onPress={()=>this.remover(livro)}
							>
								<Text> Remover da Lista </Text>
							</Pressable>
						</View>
					))}
				</ScrollView>
			</View>	
		);
	}
}

export default Lista;
