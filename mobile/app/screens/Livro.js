import React from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { ip } from '../model/';
import { estilos } from '../styles/LivroStyles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

class Livro extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...this.props.route.params,
			avaliacoes: [],
			comentario: "",
			nota: 0,
		};
	}

	componentDidMount(){
		const {navigation} = this.props;
		this.carregarAvaliacoes();
		this.unsubscribeFocus = navigation.addListener("focus", () => {
			this.carregarAvaliacoes()
		});
	}

	componentWillUnmount() {
		if(this.unsubscribeFocus) {
			this.unsubscribeFocus();
		}
	}

	async adicionarLista(){
		const {LID} = this.state.livro;
		const {UID} = this.state.usuario;
		console.log(this.state);
		try{
			const res = await fetch(`http://${ip}/add_lista`,{
				method:"POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ UID, LID }),
			});
			const data = await res.json();
			if(data.success)
					Alert.alert("Sucesso","Livro Adicionado a lista");
			else
				Alert.alert("Erro", data.mensagem);
		}catch(err){
			Alert.alert("Erro ao conectar com o banco de dados",err);
		}
	}

	async carregarAvaliacoes(){
		const {LID} = this.state.livro;
		try{
			const res = await fetch(`http://${ip}/avaliacoes`,{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({LID}),
			});
			const data = await res.json();
			this.setState({avaliacoes: data.result});
		} catch(err){
			Alert.alert("Erro ao conectar com o banco de dados",err);
		}
		
	}
	
	async comentar(){
		const {LID} = this.state.livro;
		const {UID} = this.state.usuario;
		const {comentario, nota} = this.state;
		if(comentario == "" || nota == 0) return;
		try{
			const res = await fetch(`http://${ip}/comentar`,{
				method:"POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({LID, UID, comentario, nota}),
			});
			const data = await res.json();
			if(data.success){
				Alert.alert("Sucesso","Comentario enviado");
				this.setState({comentario:"",nota:0});
				this.carregarAvaliacoes();
			}
			else
				Alert.alert("Erro", data.mensagem);
		} catch(err){
			Alert.alert("erro ao conectar com o banco de dados",err);
		}
	}

	async reservar(){
		const {LID} = this.state.livro;
		const {UID} = this.state.usuario;
		try{
			const res = await fetch(`http://${ip}/reservar`,{
				method:"POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({LID, UID}),
			});
			const data = await res.json();
			if(data.success){
					Alert.alert("Sucesso","Livro Reservado");
			}
			else
				Alert.alert("Erro", data.mensagem);
		} catch(err){
			Alert.alert("erro ao conectar com o banco de dados",err);
		}
	}

	render() {
		const nota = [1,2,3,4,5];
		return (
			<View style={estilos.container}>
				<Text style={estilos.titulo}> {this.state.livro.nome} </Text>
				<View style={estilos.linha}/>
				<View style={estilos.box}>
					<View style={estilos.row}>
						<Text style={estilos.texto}> Autor: </Text> 
						<Text style={estilos.texto4}>{this.state.livro.autor} </Text>
					</View>
					<View style={estilos.row}>
						<Text style={estilos.texto}> Gênero: </Text> 
						<Text style={estilos.texto4}>{this.state.livro.genero} </Text>
					</View>
					<View style={estilos.row}>
						<Text style={estilos.texto}> Avaliação: </Text> 
						<Text style={estilos.texto4}>{this.state.livro.nota} </Text>
					</View>
					<View style={estilos.row}>
						<Text style={estilos.texto}> Descrição: </Text> 
						<Text style={estilos.texto4}>{this.state.livro.descricao} </Text>
					</View>
				</View>
				

				<TouchableOpacity
					style={estilos.botao2}
					onPress={()=>this.adicionarLista()}
					activeOpacity={0.7}
				>	
					<FontAwesome name="bookmark" color="white" size={16} style={{marginLeft: 15,marginRight:5}}/>
					<Text style={estilos.texto2}>Listar</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={estilos.botao3}	
					onPress={() => this.reservar()}
					activeOpacity={0.7}
				>
					<Text style={estilos.texto3}> {"Reservar"} </Text>
				</TouchableOpacity>	
					
				<ScrollView style={estilos.scroll} >
					<Text style={estilos.titulo2}> Comentários </Text>
					<View style={estilos.scroll_item}>
						<View style={estilos.inline}>
							<TextInput
								multiline
								style={estilos.comentario}
								value={this.state.comentario}
								placeholder="Achei ótimo!" 
								placeholderTextColor="gray" 
								onChangeText={(comentario)=>{this.setState({comentario})}}
							/>
						</View>
						<View style={estilos.inline}>
							{nota.map((o)=>{
								return (
									<TouchableOpacity
										style={estilos.botao4}
										key={o}
										onPress={()=>this.setState({nota:o})}
									>
										<AntDesign name="star" size={40} color={this.state.nota >= o ? "#ffd800" : "white"} />
									</TouchableOpacity>
								)
							})}
						</View>
						<TouchableOpacity
								style={estilos.botao}
								onPress={()=>this.comentar()}
								activeOpacity={0.7}
							>
								<Text style={estilos.texto}> {"Comentar"} </Text>
							</TouchableOpacity>
					</View>
					{this.state.avaliacoes.map((comentario,index) => (
						<View style={estilos.scroll_item} key={index}>
							<Text style={estilos.texto} > {comentario.usuario + " nota: " + comentario.nota} </Text>
							<Text style={estilos.texto} > {comentario.descricao} </Text>
						</View>
					))}
				</ScrollView>
			</View>
		);
	}
}

export default Livro;
