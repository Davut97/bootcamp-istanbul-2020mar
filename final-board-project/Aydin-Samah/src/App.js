import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'fontsource-roboto';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/board/Dashboard';
import CreatList from './components/lists/CreatList';
import List from './components/lists/List';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import CompletedLists from './components/lists/CompletedLists';
import Completedlist from './components/lists/CompletedList';
function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route path='/' exact component={Dashboard} />
				<Route path='/list/:id' component={List} />
				<Route path='/login' component={LogIn} />
				<Route path='/signup' component={SignUp} />
				<Route path='/create' component={CreatList} />
				<Route path='/completedlists' component={CompletedLists} />
				<Route path='/completedlist/:id' component={Completedlist} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
