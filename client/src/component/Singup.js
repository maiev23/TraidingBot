import React, { useReducer, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }));

function reducer(state, action) {
    return {
      ...state,
      [action.name]: action.value
    };
  }

const Signup = (props) => {
    const [value, setValue] = useState(false);
    const [state, dispatch] = useReducer(reducer, {
        email: '',
        password: '',
        sKey: '',
        aKey: ''
    });
    const { email, password, sKey, aKey } = state;
    const onChange = e => {
        dispatch(e.target);
    }
    const classes = useStyles();

    return (
      <div>
        <center>
          <h1>Sign Up</h1>
          <form
            className={classes.root} noValidate autoComplete="off"
            onSubmit={e => {
              e.preventDefault();
              // TODO : 서버에 회원가입을 요청 후 로그인 페이지로 이동 하세요.
              // onSubmit 이벤트로 바뀌는 state 값을 data 변수에 담는다.
             return axios
             .post('http://localhost:4000/signup/', {
                 username: email,
                 password: password,
                 sKey: sKey,
                 aKey: aKey
             })
             .then(() => {
                 props.history.push('/login')
                 alert('회원가입이 되었습니다.')
             })
             .catch(err => {
                 console.log(err)  
                 setValue (true)
             });
            }}
          >
            <div>
            <TextField
            id="filled-email-input"
            error={value}
            label="email"
            type="email"
            name="email"
            autoComplete="current-email"
            helperText={value ? '이미 존재하는 아이디입니다.': ''}
            variant="filled"
            onChange={onChange}
            />
            </div>
            <div>
            <TextField
            id="filled-password-input"
            variant="filled"
            error={value}
            label="Password"
            type="password"
            name='password'
            autoComplete="current-password"
            onChange={onChange}
            />
            </div>
            <div>
            <TextField
            id="filled-sKey-input"
            variant="filled"
            error={value}
            label="sKey"
            type="password"
            name='sKey'
            onChange={onChange}
            />
            <TextField
            id="filled-aKey-input"
            variant="filled"
            error={value}
            label="aKey"
            type="password"
            name='aKey'
            onChange={onChange}
            />
            </div>
            <div>
              <Link to="/login">이미 아이디가 있으신가요?</Link>
            </div>
            <Button variant="contained" color="primary"type='submit' >
             회원가입
            </Button>
          </form>
        </center>
      </div>
    );
}


export default withRouter(Signup);