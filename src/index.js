import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import register from './serviceWorker';
import { Provider } from 'react-redux';
import LoginContainer from './componentes/Login';
import RegistroContainer from './componentes/Registro';
import HomeContainer from './componentes/Home';
import GetEmployeeContainer from './componentes/Employees/getEmployee';
import CreateEmployeeContainer from './componentes/Employees/createEmployee';
import GetBotContainer from './componentes/Bots/getBot';
import CreateBotContainer from './componentes/Bots/createBot';
import GetMessageContainer from './componentes/Messages/getMessages';
import SendMessageContainer from './componentes/Messages/sendMessage';
import RemoveMemberGroupContainer from './componentes/Groups/removeMemberGroup';
import CreateUsersContainer from './componentes/Users/createUsers'
import GetUserContainer from './componentes/Users/getUsers'
import { loader, login, registerUser, listbots, listgroups, listemployees, listmessages, listusers, sendMessage, messagesUser} from './reducers/functionsReductors';

const reducers = combineReducers({ loader, login,registerUser,listbots,listgroups, listemployees, listmessages,listusers, sendMessage, messagesUser })
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" redirect component={LoginContainer} />     
                    <Route exact path="/forgotPassword" component={RegistroContainer} />   
                    <Route exact path="/home" component={HomeContainer} />   
                    <Route exact path="/getEmployees" component={GetEmployeeContainer} />   
                    <Route exact path="/addEmployees" component={CreateEmployeeContainer}/>
                    <Route exact path="/getBots" component={GetBotContainer}/>
                    <Route exact path="/addBots" component={CreateBotContainer}/>
                    <Route exact path="/getMessages" component={GetMessageContainer}/>
                    <Route exact path="/sendMessages" component={SendMessageContainer}/>
                    <Route exact path="/removeMemberGroups" component={RemoveMemberGroupContainer}/>
                    <Route exact path="/addUsers" component={CreateUsersContainer}/>
                    <Route exact path="/getUsers" component={GetUserContainer}/>
                </Switch>
            </BrowserRouter>
        </Provider>

    ), document.getElementById('root'));
    register();
