import React from "react";
import { View, Text, TextInput, Button, ScrollView, Alert, Pressable} from "react-native";
import { ip } from "../model/";

class Principal extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			...this.props.route.params,
			pesquisa: "",
			resultados: [],
		}
	}

	componentDidMount(){
		const {navigation} = this.props;
		this.pesquisar();
		this.unsubscribeFocus = navigation.addListener("focus", () => {
			this.pesquisar()
		});
	}

	componentWillUnmount() {
		if(this.unsubscribeFocus) {
			this.unsubscribeFocus();
		}
	}

	async pesquisar(){
		const { pesquisa } = this.state;
		try {
			const res = await fetch(`http://${ip}/pesquisa`,{
				method: "POST",
				headers: {"Content-Type":"application/json"},
				body:JSON.stringify({ pesquisa}),
			});
			const resultados = await res.json();
			this.setState({ resultados });
			console.log(resultados);
		} catch(err){
			Alert.alert("Erro ao connectar com o banco de dados");
		}
	}
	render(){
		return(
			<View>
				<TextInput onChangeText={(texto)=>this.setState({pesquisa:texto})} />
				<Button title="Pesquisar" onPress={() => this.pesquisar()}/>
				<ScrollView style={{ marginTop: 10 }}>
					{this.state.resultados.map((livro, index) => (
						<Pressable key={index} style={{ marginBottom: 10, padding: 5, borderWidth: 1, borderColor: "#ddd" }}
							onPress={()=>this.props.navigation.navigate("Livro",{usuario:this.state.usuario,livro})}
						>
							<Text>Nome: {livro.nome}</Text>
							<Text>Autor: {livro.autor}</Text>
							<Text>Gênero: {livro.genero}</Text>
							<Text>Nota: {livro.nota}</Text>
						</Pressable>
					))}
				</ScrollView>
			</View>	
		);
	}
}

export default Principal;
