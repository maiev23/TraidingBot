import React from 'react';
import { withRouter, Link, useHistory } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      accesskey: '',
      secretkey: ''
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }
  handleInputValue = key => e => {
    this.setState({ [key]: e.target.value });
  };
  render() {
    const { email, password, accesskey, secretkey } = this.state;
    return (
      <div>
        <center>
          <h1>Sign Up</h1>
          <form
            onSubmit={e => {
              e.preventDefault();
              // TODO : 서버에 회원가입을 요청 후 로그인 페이지로 이동 하세요.
              axios
                .post('http://localhost:4000/signup', {
                  email: email,
                  password: password,
                })
                .then(res => {
                  this.props.history.push('/');
                })
                .catch(err => console.log(err));
                localStorage.setItem("sKey", secretkey)
                localStorage.setItem("aKey", accesskey)
                // console.log(localStorage.getItem('aKey'))
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
                onChange={this.handleInputValue('password')}
                type="password"
                placeholder="비밀번호를 입력 해주세요"
              ></input>
            </div>
            <div>
              <input
                onChange={this.handleInputValue('accesskey')}
                placeholder="accesskey"
              ></input>
              <input
                type="mobile"
                onChange={this.handleInputValue('secretkey')}
                placeholder="secretkey"
              ></input>
            </div>
            <div>
              <Link to="/login">이미 아이디가 있으신가요?</Link>
            </div>
            <button
              type="submit"
            >
              회원가입
            </button>
          </form>
        </center>
      </div>
    );
  }
}

export default withRouter(Signup);