import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './MesuModal.css'

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      textAlign: "center"
    },
  }));
  
  function comma(obj) {
    var regx = new RegExp(/(-?\d+)(\d{3})/);
    var bExists = obj.indexOf(".", 0);//0번째부터 .을 찾는다.
    var strArr = obj.split('.');
    while (regx.test(strArr[0])) {//문자열에 정규식 특수문자가 포함되어 있는지 체크
        //정수 부분에만 콤마 달기 
        strArr[0] = strArr[0].replace(regx, "$1,$2");//콤마추가하기
    }
    if (bExists > -1) {
        //. 소수점 문자열이 발견되지 않을 경우 -1 반환
        obj = strArr[0] + "." + strArr[1];
    } else { //정수만 있을경우 //소수점 문자열 존재하면 양수 반환 
        obj = strArr[0];
    }
    return obj;//문자열 반환
  }
  function removeComma(str) {
    if (str == 0 || str< 1) {
        return str
    }
    let n = parseInt(str.replace(/,/g, ""));
    return n;
  }
  function number(x) {
    if(x<1){
        return x
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
    const MesuModal=(props) => {
      console.log(props)
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleMesu = () => {
      let token = localStorage.getItem('token')
      axios.post('http://localhost:4000/meme/medo',
          {
              market: props.market,
              mesu: removeComma(props.mesu),
              jumuns: removeComma(props.jumuns),
              'token': token
          })
          .then(data => {
            if(data.data.data === null){
              alert(data.data.message)
              setOpen(false)
            } else{
              alert('매수 신청이 완료되었습니다. 자세한 내용 거래내역에서 확인하세요')
              setOpen(false)
            }
          })
          .catch(()=>{
            alert(' 인증시간이 만료되었습니다!!\n 다시로그인 해주세요')
          })
    };
  
    return (
      <div>
        <Button type="button" variant="contained" color="secondary" size='large' onClick={handleOpen}>
          매도
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title" >매도</h2>
            <div id="simple-modal-description">
                <div className='modalEm'>매도가<em>({props.market.substring(0,3)})</em><strong>{number(removeComma(props.mesu))}</strong></div>
                <div className='modalEm'>수량<em>({props.market.substring(4,8)})</em><strong>{props.jumuns}</strong></div>
                <div className='modalEm'>총<em>({props.market.substring(0,3)})</em><strong>{props.market[0]==='K' ? number((removeComma(props.mesu)*removeComma(props.jumuns)).toFixed(0)) : comma((removeComma(props.mesu)*removeComma(props.jumuns)).toFixed(8))}</strong></div>
            </div>
            <span className='modalB'>
            <Button variant="contained" color="primary"  size='medium'onClick={handleClose} onClick={handleMesu} >
                          확인
            </Button>
            </span>
            <Button variant="contained" color="primary"  size='medium'onClick={handleClose} >
                          취소
            </Button>
          </div>
        </Modal>
      </div>
    );
  }

export default MesuModal