import React from "react";
import { View, Text, TextInput, Button, ScrollView, Alert, Pressable} from "react-native";
import { ip } from "../model/";

class Tinder extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			...this.props.route.params,
			preferencia: "",
			matchs: [],
			procurando: false,
		}
		console.log(this.state);
	}
	componentDidMount(){
		const {navigation} = this.props;
		this.unsubscribeFocus = navigation.addListener("focus", () => {
			this.encontros();
		});
	}
	componentWillUnmount() {
		if(this.unsubscribeFocus) {
			this.unsubscribeFocus();
		}
	}

	async match(){
		const { preferencia } = this.state;
		const { UID, genero, pontuacao } = this.state.usuario;

		if(preferencia == "") return;
		if( pontuacao < 5){
			Alert.alert("Erro","Quantidades de pontos insuficientes");
			return;
		}
		try{
			const res = await fetch(`http://${ip}/fila_tinder`,{
				method: "POST",
				headers: {"Content-Type":"application/json"},
				body:JSON.stringify({ UID, genero, preferencia }),
			});
			const data = await res.json();
			Alert.alert("Sucesso", data.message);
			this.encontros();
		}catch(err){
			Alert.alert("Erro Impossivel conectar ao banco de dados!", err.message);
		}
	}

	async encontros(){
		const { UID } = this.state.usuario;
		try{
			const res = await fetch(`http://${ip}/encontros`,{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ UID }),
			});
			const { data, procurando } = await res.json();

			console.log(data, procurando);
			this.setState({matchs:data, procurando});
		}catch(err){
			Alert.alert("Erro","Impossivel conectar ao banco de dados!");
		}
	}
	
	render(){
		const options = ["Homem", "Mulher"];
		return(
			<View>
				{options.map((o)=>(
					<Pressable
						key={o}
						onPress={()=>this.setState({preferencia:o})}
					>
						<Text>
							{o}
						</Text>
					</Pressable>
				))}
				<Pressable
					onPress={()=>this.match()}
				>
					<Text> { "Match ( 5 pontos )" } </Text>
				</Pressable>

				<ScrollView style={{ marginTop: 10 }}>
					{ this.state.procurando &&
						<View>
							<Text> {"Procurando Match"} </Text>
						</View>
					}
					{(this.state.matchs || []).map((match,index)=>(
						<View key={index}>
							<Text> {match.usuario} </Text>
							<Text> {match.email} </Text>
							<Text> {"Sala " + match.sala} </Text>
							<Text> {match.dia} </Text>
						</View>
					))}
				</ScrollView>

			</View>	
		);
	}
}

export default Tinder;
