import React from 'react';
import './App.css';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Singup';
import  Home  from './component/Home';

class App extends React.Component {
  state = {
    isLogin: false
    //key
  };
  //로그인 성공여부에 따라 스테이트 변경
  handleIsLoginChange() {
    this.setState({ isLogin: true });
  }
 render() {
  const { isLogin} = this.state;
   return (
     <div>
       <Switch>
         {/*로그인 라우터*/}
         <Route
          path='/login'
          render={()=> (
            <Login handleIsLoginChange={this.handleIsLoginChange.bind(this)}/>
          )}
         />
         <Route
         /*회원가입 라우터*/
          exact
          path='/signup'
          render={() => (
            <Signup/>
          )}
         />
         <Route
         /*홈*/
         exact
         path="/home"
         render={() => (
           <Home isLogin={isLogin}/>
         )}
         />
         <Route
         path='/'
         render={() => {
           if(isLogin) {
             return <Redirect to='/home'/>
           }
           return <Redirect to='/login'/>
         }}
         />
       </Switch>
     </div>
   );
 }
}
export default App;
