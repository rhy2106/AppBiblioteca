import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Autenticacao, InicioUsuario, InicioAdmin } from './navigation/';
import { Livro, Historico } from './screens';

const Stack = createStackNavigator();

class App extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<Stack.Navigator>
				<Stack.Screen name="autenticacao" component={Autenticacao} 
					options={{ headerShown:false }}
				/>
				<Stack.Screen name="inicioUser" component={InicioUsuario}
					options={{ headerShown:false }}
				/>
				<Stack.Screen name="inicioAdm" component={InicioAdmin}
					options={{ headerShown:false }}
				/>
				<Stack.Screen name="Livro" component={Livro}/>
				<Stack.Screen name="historico" component={Historico}/>
			</Stack.Navigator>
			
		);
	}
}

export default App;

