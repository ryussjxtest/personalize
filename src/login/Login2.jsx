import React, {useContext, useRef} from 'react';
import { useSetState } from 'react-use';

import { AuthContext } from '../context/Auth.context';

import { Image, Container } from 'semantic-ui-react'

const initialState = {
  email: '',
  password: '',
  id: ''
}

const LoginForm = () => {
  const { state: ContextState, login } = useContext(AuthContext);
  console.log("[LoginForm] useContext(AuthContext)", ContextState,login );

  const {
    isLoginPending,
    isLoggedIn,
    loginError,
    username,
    userId,
    maxAdmin
  } = ContextState;
  const [state, setState] = useSetState(initialState);

  const onSubmit = (e) => {
    e.preventDefault();

    const newAdmin = adminRef.current.value;
    console.log('[onSubmit adminRef] ',newAdmin);

    const { email, password, id } = state;
    
    // console.log("[onSubmit]",email, password, id);
    // login(email, password, id);
    login(newAdmin, newAdmin, id);
    setState({
      email: '',
      password: '',
      id: ''
    });
  }

  // React.useEffect(() => {
  //   async function fetchData () {
  //     const response = await axios.get(
  //       'https://k1js8ud1xd.execute-api.us-east-1.amazonaws.com/prod/user',);
  //    console.log((response.data).Items);
  //   //  console.log((response.data).Items[0]);
  //    return (response.data).Items;
  //     //  setMovies((response.data)['Item'])
      
      
  //   }
  //   fetchData();
  // }, []);
  let temp = [];
  console.log("[onSubmit] maxAdmin", maxAdmin);
  for(let i = 0; i < maxAdmin; i++) {
    let tempuser = `admin${i===0?'':i}`;
        if(tempuser !== state.username){
            temp.push(tempuser);
        }  
  }
  // form 내부에서 선택한 값을 읽어 오기 위한 부분.
  // Hook... useRef를 활용한다.
  const adminRef = useRef(null); // <select ref={dayRef}/>

  return (
    <>
    <Container style={{ marginTop: 150 }} textAlign='center' >

      <h1> Welecom to Pebble Movie Recommendation</h1>
    </Container>
    <Container style={{ marginTop: 70 }} textAlign='center' >
      <Image src="/image/pngwing.com.png" centered size='medium' />
    </Container>

    <Container style={{ marginTop: 70 }} >
    <form name="loginForm" onSubmit={onSubmit}>
      
      <div className="row">

        <div className="col-sm-3 col-md-6">
          <label htmlFor="email" >Admin login : Please Select Admin </label>
        </div>
        
        <div className="col-sm-9 col-md-6">
          <select ref={adminRef}>
            {temp.map((t)=>{
                return(<option key={t}>{t}</option>)
            })}
          </select>
        </div>



        <div className="col-sm-3 col-md-6">
        </div>
        <div className="col-sm-9 col-md-6">
          <input className="primary" type="submit" value="Login" />
        </div>
        
      </div>

      { isLoginPending && <div>Please wait...</div> }
      { isLoggedIn && <div>Success.</div> }
      { loginError && <div>{loginError.message}</div> }
    </form>
    </Container>
    </>
  )
}


export default LoginForm;