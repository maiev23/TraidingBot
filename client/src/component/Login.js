import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

class Login extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        email: '',
        password: '',
      };
      this.handleInputValue = this.handleInputValue.bind(this);
    }
    handleInputValue = key => e => {
      this.setState({ [key]: e.target.value });
    };
    render() {
      const { email, password } = this.state;
      const { handleIsLoginChange } = this.props;
      return (
        <div>
          <center>
            <h1>Sign In</h1>
            <form
              onSubmit={e => {
                e.preventDefault();

                return axios
                  .post('http://localhost:4000/signin', {
                    email: email,
                    password: password
                  })
                  .then(() => {
                    handleIsLoginChange();
                    this.props.history.push('/');
                  })
                  .catch(err => console.log(err));
              }}
            >
              <div>
                <input
                  type="email"
                  placeholder="이메일을 입력 해주세요"
                  onChange={this.handleInputValue('email')}
                ></input>
              </div>
              <div>
                <input
                  type="password"
                  placeholder="비밀번호를 입력 해주세요"
                  onChange={this.handleInputValue('password')}
                ></input>
              </div>
              <div>
                <Link to="/signup">아직 아이디가 없으신가요?</Link>
              </div>
              <button
                type="submit"
              >
                로그인
              </button>
            </form>
          </center>
        </div>
      );
    }
  }
  
  export default withRouter(Login);