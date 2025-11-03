import React from "react";
import { View, Text, TextInput, Button, ScrollView, Alert, Pressable} from "react-native";
import { ip } from "../model/";
import { estilos } from "../styles/FilaStyles";

class Fila extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			...this.props.route.params,
			livros_reservados: [],
			livros_emprestados: [],
		}
	}
	componentDidMount(){
		const {navigation} = this.props;
		this.reservados();
		this.emprestados();
		this.unsubscribeFocus = navigation.addListener("focus", () => {
			this.reservados();
			this.emprestados();
		});
	}
	componentWillUnmount() {
		if(this.unsubscribeFocus) {
			this.unsubscribeFocus();
		}
	}

	async reservados(){
		const {UID} = this.state.usuario;
		try{
			const res = await fetch(`http://${ip}/fila`,{
				method: "POST",
				headers: {"Content-Type":"application/json"},
				body:JSON.stringify({ UID }),
			});
			const { data } = await res.json();
			console.log(data);
			this.setState({ livros_reservados: data });
		}catch(err){
			Alert.alert("Erro ao connectar com o banco de dados");
		}
	}

	async emprestados(){
		const {UID} = this.state.usuario;
		try{
			const res = await fetch(`http://${ip}/emprestados`,{
				method: "POST",
				headers: {"Content-Type":"application/json"},
				body:JSON.stringify({ UID }),
			});
			const { data } = await res.json();
			console.log(data);
			this.setState({ livros_emprestados: data });
		}catch(err){
			Alert.alert("Erro ao connectar com o banco de dados");
		}
	}

	render(){
		return(
			<View style={estilos.container}>
				<ScrollView style={ estilos.scroll }>
					<Text style={estilos.titulo}> Livros Reservados </Text>
					<View style={estilos.linha}/>
					{this.state.livros_reservados.map((livro,index)=>(
						<View
							style={estilos.scroll_item}
							key={index}
						>
							<Text style={estilos.texto3} > {livro.nome} </Text>
							<Text style={estilos.texto2} > {livro.autor} </Text>
							<Text style={estilos.texto2} >
								{ livro.disponiveis >= livro.posicao ? " Disponível" : " Indisponível"}
							</Text>
						</View>
					))}
					<View style={estilos.linha2}/>
					<Text style={estilos.titulo}> Livros Emprestados </Text>
					{/* <View style={estilos.scroll_item}>
						<Text style={estilos.texto3} > livro.nome </Text>                Eu fiz a parte debaixo com esse exemplo pq n consegui pegar livro emprestado!!
						<Text style={estilos.texto2} > livro.autor </Text>
						<View style={{flexDirection:"row"}}>
							<Text style={estilos.texto2}> {"Empréstimo: "} </Text>
							<Text style={estilos.texto4}>12/12/34/-5352h</Text>
						</View>
						<View style={{flexDirection:"row"}}>
							<Text style={estilos.texto2}> {"Prazo: "} </Text>
							<Text style={estilos.texto4}>12/12/34/-5352h</Text>
						</View>
					</View> */}
					{this.state.livros_emprestados.map((livro,index)=>(
						<View 
							style={estilos.scroll_item}
							key={index}
						>
							<Text style={estilos.texto3} > {livro.nome} </Text>
							<Text style={estilos.texto2} > {livro.autor} </Text>
							<View style={{flexDirection:"row"}}>
								<Text style={estilos.texto2}>Empréstimo: </Text>
								<Text style={estilos.texto4} > {new Date(livro.Emprestimo).toLocaleDateString('pt-BR')} </Text>
							</View>
							<View style={{flexDirection:"row"}}>
								<Text style={estilos.texto2} >Prazo: </Text>
								<Text style={estilos.texto4} > {new Date(livro.Prazo).toLocaleDateString('pt-BR')} </Text>
							</View>
						</View>
					))}
				</ScrollView>
			</View>	
		);
	}
}

export default Fila;
