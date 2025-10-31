import React from "react";
import { View, Text, TextInput, Button, ScrollView, Alert, Pressable} from "react-native";
import { ip } from "../model/";

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
		try{
			const res = await fetch(`http://${ip}/buscar`,{
				method: "POST",
				headers: {"Content-Type":"application/json"},
				body:JSON.stringify({pesquisa}),
			});
			const perfils = await res.json();
			this.setState({ perfils });
		} catch(err){
			Alert.alert("Erro","Não foi possivell conectar ao banco de dados!");
		}
	}

	render(){
		return(
			<View>
				<ScrollView style={{ marginTop: 10 }}>
					<Text> Usuarios </Text>
					{this.state.perfils.map((usuario,index)=>(
						<Pressable 
							onPress={()=>this.props.navigation.navigate("historico",{usuario})}
							key={index}
						>
							<Text> {"Usuario: " + usuario.usuario} </Text>
							<Text> {"UID: " + usuario.UID} </Text>
							<Text> {"Email: " + usuario.email} </Text>
							<Text> {"Genero: " + usuario.genero} </Text>
							<Text> {"Atrasados: " + usuario.atrasados} </Text>
							<Text> {"Reservados: " + usuario.reservados} </Text>
						</Pressable>
					))}
				</ScrollView>
			</View>	
		);
	}
}

export default Usuarios;

