import React from "react";
import { View, Text, TextInput, Button, ScrollView, Alert, Pressable,StyleSheet, TouchableOpacity} from "react-native";
import { ip } from "../model/";
import { estilos } from "../styles/UsuariosStyles";

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
						placeholder="Nome, email, ID" 
						placeholderTextColor="gray" 
					/>
					<TouchableOpacity 
						style={estilos.botao}
						onPress={()=>this.buscar()}
						activeOpacity={0.7}
					>
						<Text style={estilos.texto2}> {"Buscar"} </Text>
					</TouchableOpacity>
				</View>
				<ScrollView style={estilos.scroll}>
					<Text style={estilos.titulo}> Usuários </Text>
					<View style={estilos.linha}/>
					{this.state.perfils.map((usuario,index)=>(
						<TouchableOpacity 
							style={estilos.scroll_item}
							onPress={()=>this.props.navigation.navigate("historico",{usuario})}
							key={index}
							activeOpacity={0.7}
						>	
							<View style={{flexDirection: "row"}}>
								<Text style={estilos.texto3}> Usuário: </Text>
								<Text style={estilos.texto}>{usuario.usuario} </Text>
							</View>
							<View style={{flexDirection: "row"}}>
								<Text style={estilos.texto3}> ID: </Text>
								<Text style={estilos.texto}>{usuario.UID} </Text>
							</View>
							<View style={{flexDirection: "row"}}>
								<Text style={estilos.texto3}> Email: </Text>
								<Text style={estilos.texto}>{usuario.email} </Text>
							</View>
							<View style={{flexDirection: "row"}}>
								<Text style={estilos.texto3}> Gênero: </Text>
								<Text style={estilos.texto}>{usuario.genero} </Text>
							</View>
							<View style={{flexDirection: "row"}}>
								<Text style={estilos.texto3}> Atrasados: </Text>
								<Text style={estilos.texto}>{usuario.atrasados} </Text>
							</View>
							<View style={{flexDirection: "row"}}>
								<Text style={estilos.texto3}> Reservados: </Text>
								<Text style={estilos.texto}>{usuario.reservados} </Text>
							</View>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>	
		);
	}
}

export default Usuarios;
