import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import axios from 'axios';

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
  },
}));

export default function MesuModal(props) {
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
    axios.post('http://localhost:4000/meme/mesu',
        {
            market: props.market,
            mesu: props.mesu,
            jumuns: props.jumuns,
            'token': token
        })
        .then(data => {
            console.log(data)
        })
  };

  return (
    <div>
      <Button type="button" variant="contained" color="primary" size='large' onClick={handleOpen}>
        매수
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">매수</h2>
          <div id="simple-modal-description">
              <div>매수가<em>(KRW)</em><strong>{props.mesu}</strong></div>
              <div>수량<strong>{props.jumuns}</strong></div>
              <div>총<em>(KRW)</em><strong>{(props.mesu*props.jumuns)}</strong></div>
          </div>
          <Button variant="contained" color="primary"  size='large'onClick={handleClose} onClick={handleMesu} >
                        확인
          </Button>
          <Button variant="contained" color="primary"  size='large'onClick={handleClose} >
                        취소
          </Button>
        </div>
      </Modal>
    </div>
  );
}