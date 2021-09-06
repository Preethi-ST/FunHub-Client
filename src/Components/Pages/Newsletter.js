import React,{useState} from 'react';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './Newsletter.css'
import { Button } from '@material-ui/core';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      marginTop : '2rem',
    },
  },
}));
const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });
export default function Newsletter() {
  const classes = useStyles();
    // create state variables for each input
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message,setMessage] = useState('');
    const [state,setState] = useState(false)
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        const valid = validateEmail(email)
        console.log(valid)
        if(!valid){
            setState(false)
            setMessage('Invalid Email')
        }
        else{
            const result = await axios.post(`https://funhub-server.herokuapp.com/signup`,{firstName,lastName,email})   
            result.data.success ? setState(true) : setState(false)
            result.data.success ? setMessage('Subscribed !!!') : setMessage(result.data.message)
        }
      };
  return (
    <ThemeProvider theme={darkTheme}>
        <form className={`${classes.root} sub_form`} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <h2 style={{fontFamily: "Montserrat"}}>Subscribe</h2>
            {
                message && (
                    <div className={`${state ? `success` : `failed`}`}>
                        {message ? message : 'Invalid email'}
                    </div>
                ) 
            }
            <div>
                <TextField id="fname" label="First Name" variant="outlined" value={firstName}
                    onChange={e => setFirstName(e.target.value)}/>
            </div>
            <div>
                <TextField id="lname" label="Last Name" variant="outlined" value={lastName}
                    onChange={e => setLastName(e.target.value)} />
            </div>
            <div>
                <TextField id="email" label="Email" variant="outlined" type='email' value={email}
                    onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
                <Button type="submit" variant="contained" style={{backgroundColor: '#12824C', color: '#FFFFFF'}} fullWidth>
                    Subscribe
                </Button>
            </div>
        </form>
    </ThemeProvider>
  );
}

