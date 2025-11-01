import React from "react";
import { View, Text, TextInput, Button, ScrollView, Alert, Pressable} from "react-native";
import { ip } from "../model/";
import { estilos } from '../styles/Estilos';

class Estoque extends React.Component{
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
		} catch(err){
			Alert.alert("Erro ao connectar com o banco de dados");
		}
	}
	render(){
		return(
			<View style={estilos.container}>
				<View style={estilos.inline}>
					<TextInput
						style={estilos.input}
						onChangeText={(texto)=>this.setState({pesquisa:texto})}
					/>
					<Pressable
						style={estilos.botao}
						onPress={() => this.pesquisar()}
					>
						<Text style={estilos.texto}> {"Pesquisar"} </Text>
					</Pressable>
				</View>
				<ScrollView style={estilos.scroll}>
					{this.state.resultados.map((livro, index) => (
						<Pressable
							key={index}
							style={estilos.scroll_item}
							onPress={()=>this.props.navigation.navigate("Livro",{usuario:this.state.usuario,livro})}
						>
							<Text style={estilos.texto}> Nome: {livro.nome}</Text>
							<Text style={estilos.texto}> Autor: {livro.autor}</Text>
							<Text style={estilos.texto}> Gênero: {livro.genero}</Text>
							<Text style={estilos.texto}> Nota: {livro.nota}</Text>
							<Text style={estilos.texto}> Quantidade: {livro.quantidade}</Text>
							<Text style={estilos.texto}> Disponiveis: {livro.disponiveis}</Text>
						</Pressable>
					))}
				</ScrollView>
			</View>	
		);
	}
}

export default Estoque;

