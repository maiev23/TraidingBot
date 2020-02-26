import React, { useReducer, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
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
    [action.type]: action.value
  };
}

const Login = (props) => {
    const [value, setValue] = useState(false);
    const [state, dispatch] = useReducer(reducer, {
        email: '',
        password: ''
      });
      const { email, password } = state;
      const onChange = e => {
        dispatch(e.target);
      };
      const classes = useStyles();
    return (
        <div>
        <center>
          <h1>Sign In</h1>
          <form className={classes.root} noValidate autoComplete="off"
            onSubmit={e => {
              e.preventDefault();
              // TODO : 서버에 로그인 요청 후 처리하세요.
              return axios
                .post('http://localhost:4000/signin', {
                  email: email,
                  password: password
                })
                .then(() => {
                  props.handleIsLoginChange();
                  props.history.push('/');
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
            autoComplete="current-email"
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
            autoComplete="current-password"
            helperText={value ? '비밀번호또는 이메일이 틀렸습니다.': ''}
            onChange={onChange}
            />
            </div>
            <div>
              <Link to="/signup">아직 아이디가 없으신가요?</Link>
            </div>
            <Button variant="contained" color="primary"type='submit' >
             로그인
            </Button>
            {/* <button
              style={{
                width: '200px',
                height: '30px',
                margin: '5px',
                borderRadius: '5px',
                backgroundColor: 'skyblue'
              }}
              type="submit"
            >
              로그인
            </button> */}
          </form>
        </center>
      </div>
    );
};

export default withRouter(Login);