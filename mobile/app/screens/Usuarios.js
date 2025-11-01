import React from "react";
import { View, Text, TextInput, Button, ScrollView, Alert, Pressable} from "react-native";
import { ip } from "../model/";
import { estilos } from '../styles/Estilos';

class Usuarios extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			...this.props.route.params,
			perfils: [],
			pesquisa: "",
		}
	}

	componentDidMount(){
		const {navigation} = this.props;
		this.buscar();
		this.unsubscribeFocus = navigation.addListener("focus", () => {
			this.buscar()
		});
	}

	componentWillUnmount() {
		if(this.unsubscribeFocus) {
			this.unsubscribeFocus();
		}
	}

	async buscar() {
		const { pesquisa } = this.state;
		console.log(pesquisa);
		try{
			const res = await fetch(`http://${ip}/buscar`,{
				method: "POST",
				headers: {"Content-Type":"application/json"},
				body:JSON.stringify({pesquisa}),
			});
			const perfils = await res.json();
			this.setState({ perfils });
		} catch(err){
			Alert.alert("Erro Não foi possivell conectar ao banco de dados!", err.message);
		}
	}

	render(){
		return(
			<View style={estilos.container}>
				<View style={estilos.inline}>
					<TextInput
						style={estilos.input}
						value={this.state.pesquisa}
						onChangeText={(texto)=>this.setState({pesquisa:texto})}
					/>
					<Pressable 
						style={estilos.botao}
						onPress={()=>this.buscar()}
					>
						<Text style={estilos.texto}> {"Buscar"} </Text>
					</Pressable>
				</View>
				<ScrollView style={estilos.scroll}>
					<Text style={estilos.titulo}> Usuarios </Text>
					{this.state.perfils.map((usuario,index)=>(
						<Pressable 
							style={estilos.scroll_item}
							onPress={()=>this.props.navigation.navigate("historico",{usuario})}
							key={index}
						>
							<Text style={estilos.texto}> {"Usuario: " + usuario.usuario} </Text>
							<Text style={estilos.texto}> {"UID: " + usuario.UID} </Text>
							<Text style={estilos.texto}> {"Email: " + usuario.email} </Text>
							<Text style={estilos.texto}> {"Genero: " + usuario.genero} </Text>
							<Text style={estilos.texto}> {"Atrasados: " + usuario.atrasados} </Text>
							<Text style={estilos.texto}> {"Reservados: " + usuario.reservados} </Text>
						</Pressable>
					))}
				</ScrollView>
			</View>	
		);
	}
}

export default Usuarios;

