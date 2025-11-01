import React from "react";
import { View, Text, TextInput, Button, ScrollView, Alert, Pressable} from "react-native";
import { ip } from "../model/";
import { estilos } from "../styles/Estilos";

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
			<View style={estilos.container}>
				<View style={estilos.inline}>
					{options.map((o)=>(
						<Pressable
							style={[estilos.botao, (this.state.preferencia === o ? estilos.selecionado : estilos.nao_selecionado)]}
							key={o}
							onPress={()=>this.setState({preferencia:o})}
						>
							<Text style={estilos.texto}>
								{o}
							</Text>
						</Pressable>
					))}
					</View>
				<Pressable
					style={estilos.botao}
					onPress={()=>this.match()}
				>
					<Text style={estilos.texto}> { "Match ( 5 pontos )" } </Text>
				</Pressable>

				<ScrollView style={estilos.scroll}>
					{ this.state.procurando &&
						<View style={estilos.scroll_item}>
							<Text style={estilos.texto}> {"Procurando Match"} </Text>
						</View>
					}
					{(this.state.matchs || []).map((match,index)=>(
						<View 
							style={estilos.scroll_item}
							key={index}
						>
							<Text style={estilos.texto} > {match.usuario} </Text>
							<Text style={estilos.texto} > {match.email} </Text>
							<Text style={estilos.texto} > {"Sala " + match.sala} </Text>
							<Text style={estilos.texto} > {match.dia} </Text>
						</View>
					))}
				</ScrollView>

			</View>	
		);
	}
}

export default Tinder;
