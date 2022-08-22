import React, { useContext, useEffect, useRef } from 'react'

import { BrowserRouter as Router, Route, NavLink, Link, useHistory } from 'react-router-dom';

import { Menu, Container, Icon, Button, ListItem } from 'semantic-ui-react'
import MoviesList from './component/MoviesList'
import MovieDetails from './component/MovieDetails'
import { AuthContext } from './context/Auth.context';
import MoviesCarousel from './component/MoviesCarousel'
import MoviePopFirst from './component/MoviePopFirst';
import MoviePerFirst from './component/MoviePerFirst';


function Dashboard() {
    const { changeAdmin } = useContext(AuthContext);
    const { logout } = useContext(AuthContext);
    const { state } = useContext(AuthContext);

    console.log("[Dashboard] state.username: ",state)
    console.log("[Dashboard] state.username: ",state.username)
    console.log("[Dashboard] state.userId: ",state.userId)
    console.log("[Dashboard] state.maxAdmin: ",state.maxAdmin)

    const onLogout = (e) => {
        e.preventDefault();
        logout();
    }
    {/* data fetch해서 ID정보 채우기 */}
    let temp = [];
    for(let i = 0; i < state.maxAdmin; i++) {
        let tempuser = `admin${i==0?'':i}`;
        if(tempuser !== state.username){
            temp.push(tempuser);
        }        
    }
      // form 내부에서 선택한 값을 읽어 오기 위한 부분.
    // Hook... useRef를 활용한다.
    const newAdminRef = useRef(null); // <select ref={dayRef}/>
    
    const selecedNewAdmin = ()=>{
        // logout();
        const newAdmin = newAdminRef.current.value;
        changeAdmin(newAdmin,newAdmin.length===5?0:newAdmin[newAdmin.length-1]);
      
        console.log("[Dashborad]selecedNewAdmin   newAdmin : ", newAdmin);
        console.log("[Dashborad]selecedNewAdmin   state : ", state);

    }
 
    return (
        <div>
            <Router>
            <Menu fixed='top' color='teal' inverted fontSize='30px'>
                <Menu.Menu>
                    <Menu.Item header as={Link} to="/" >
                        <div><Icon name='film'/></div>
                        <div>&nbsp;Pebble World&nbsp;<br/>&nbsp;영화추천 Home</div>
                        {/* <Icon name='images'/>&nbsp;<Icon name='gamepad'/>&nbsp;<Icon name='flag checkered'/> */}
                    
                    </Menu.Item>
                </Menu.Menu>
                <Menu.Menu>
                    {/* <Menu.Item link><Icon name='star'/>인기영화Top10</Menu.Item> */}
                    <Menu.Item header as={Link} to="/pop"><Icon name='star'/>인기영화<br/>Top10</Menu.Item>
                    <Menu.Item header as={Link} to="/per"><Icon name='heart'/>추천영화<br/>Top10</Menu.Item>
                    <Menu.Item header as={Link} to='/allmovie'><Icon name='film'/>모든 영화</Menu.Item>
                </Menu.Menu>
                <Menu.Menu position='right'>
                    <Menu.Item ><b>Current User :<br/><Icon color='brown' name='user'/><span style={{color:'brown'}}>{state.username}</span></b>
                        
                    </Menu.Item>
                    <Menu.Item ><b>Change<br/>User</b>
                        {/* <select ref={newAdminRef} style={{background: "grey"}}> */}
                        <select ref={newAdminRef}>
                            {temp.map((t)=>{
                                return(<option key={t}>{t}</option>)                            
                            })}
                        </select>
                        <Button as={Link} to="/" primary onClick={selecedNewAdmin}><Icon name='exchange'/><Icon name='user'/></Button>
                    </Menu.Item>
                    {/* <Menu.Item link onClick={onLogout}>Log<br/>out</Menu.Item> */}
                    <Menu.Item ><Button onClick={onLogout}><Icon name='sign-out'/>logout</Button></Menu.Item>
                    
                </Menu.Menu>
            </Menu>

            <Container textAlign='center' style={{ marginTop: 80 }}>
                <h1> Welcome to the Pebble Movie World !! <Icon name='film'/></h1>
                <Button icon labelPosition='right' size='big' as={Link} to='/'> 
                    <Icon name='left arrow' />뒤로 가기                    
                </Button>
            </Container>

            {/* <Route path='/' exact component={() => 
                <MoviesCarousel/>
            }/> */}
            <Route path='/' exact component={() => 
                <MoviePerFirst />
                // <MoviePopFirst />
            }/>
            <Route path='/pop' exact component={() => 
                <MoviePopFirst />
            }/>
            <Route path='/per' component={() => 
                <MoviePerFirst />
            }/>
            <Route path='/allmovie' exact component={() => 
                <MoviesList/>
            }/>
            <Route path='/movies/:movieId' render={props => 
                <MovieDetails id={props.match.params.movieId} locationState={props.location.state}/>
            }/>
            {/* <Route path='/login' exact component={() => <Login />} /> */}

            </Router>
        </div>
    );
  }

  export default Dashboard;