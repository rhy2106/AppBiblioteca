import React from "react";
import { View, Text, TextInput, Button, ScrollView, Alert, Pressable,StyleSheet, TouchableOpacity} from "react-native";
import { ip } from "../model/";
import { estilos } from "../styles/PrincipalStyles";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

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
			<View style={estilos.container}>
				<View style={estilos.inline}>
					<TextInput
						style={estilos.input}
						onChangeText={(texto)=>this.setState({pesquisa:texto})}
						placeholder="Livro, autor, gênero" 
						placeholderTextColor="gray" 
					/>
					<TouchableOpacity
						style={estilos.botao}
						onPress={()=>this.pesquisar()}
						activeOpacity={0.7}
					>
						<Text style={estilos.texto2}> <FontAwesome5 name="search" size={14} color="white" /> Pesquisar</Text>
					</TouchableOpacity>
					
				</View>
				<ScrollView style={estilos.scroll}>
					{this.state.resultados.map((livro, index) => (
						<TouchableOpacity
							activeOpacity={0.7}
							key={index}
							style={estilos.scroll_item}
							onPress={()=>this.props.navigation.navigate("Livro",{usuario:this.state.usuario,livro})}
						>	
							<View style={{flexDirection:"row"}}>
								<Text style={estilos.texto3}> Nome: </Text>
								<Text style={estilos.texto} >{livro.nome}</Text>
							</View>
							<View style={{flexDirection:"row"}}>
								<Text style={estilos.texto3}> Autor: </Text>
								<Text style={estilos.texto} >{livro.autor}</Text>
							</View>
							<View style={{flexDirection:"row"}}>
								<Text style={estilos.texto3}> Gênero: </Text>
								<Text style={estilos.texto} >{livro.genero}</Text>
							</View>
							<View style={{flexDirection:"row"}}>
								<Text style={estilos.texto3}> Nota: </Text>
								<Text style={estilos.texto} >{livro.nota}</Text>
							</View>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>	
		);
	}
}

export default Principal;
