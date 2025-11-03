import React from "react";
import { View, Text, TextInput, Button, ScrollView, Alert, Pressable,StyleSheet, TouchableOpacity} from "react-native";
import { ip } from "../model/";
import { estilos } from "../styles/ListaStyles";
import FontAwesome from '@expo/vector-icons/FontAwesome';

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
			<View style={estilos.container}>
				<ScrollView style={estilos.scroll}>
					{this.state.resultados.map((livro, index) => (
						<View
							key={index}
							style={estilos.scroll_item_inline}
						>
							<TouchableOpacity style={estilos.scroll_button}
							activeOpacity={0.7}
								onPress={()=>this.props.navigation.navigate("Livro",{usuario:this.state.usuario,livro})}
							>
							<View style={{flexDirection:"row"}}>
								<Text style={estilos.texto3}> Nome: </Text>
								<Text style={estilos.texto2} >{livro.nome}</Text>
							</View>
							<View style={{flexDirection:"row"}}>
								<Text style={estilos.texto3}> Autor: </Text>
								<Text style={estilos.texto2} >{livro.autor}</Text>
							</View>
							<View style={{flexDirection:"row"}}>
								<Text style={estilos.texto3}> Gênero: </Text>
								<Text style={estilos.texto2} >{livro.genero}</Text>
							</View>
							<View style={{flexDirection:"row"}}>
								<Text style={estilos.texto3}> Nota: </Text>
								<Text style={estilos.texto2} >{livro.nota}</Text>
							</View>
							</TouchableOpacity>

							<TouchableOpacity
								activeOpacity={0.7}
								style={estilos.scroll_remove_button}
								onPress={()=>this.remover(livro)}
							>
								<FontAwesome name="trash" size={21} color="white" />
							</TouchableOpacity>
								
						</View>
					))}
				</ScrollView>
			</View>	
		);
	}
}

export default Lista;
