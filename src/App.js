import React, { Component } from 'react'
import Comments from './Comments'
import NewComment from './NewComment'
import Login from './Login'
import User from './User';
import SingUp from './SingUp';
import 'bootstrap-css-only'


class App extends Component {
  state= {
    comments: {},
    isLoading: false,
    isAuth: false,
    isAuthError: false,
    authError: '',
    isSignUpError: false,
    signUpError: '',
    user: {},
    userScreen: 'login' //ou SignUp
  }
  sendComment = comment => {
    const { database } = this.props
    const id = database.ref().child('comments').push().key
    const comments ={}
    comments['comments/'+id] = {
      comment,
      email: this.state.user.email,
      userid: this.state.user.uid
    }
    
    database.ref().update(comments)
  }
  // referencia o componente login e os atributos encaminhados, async /await aguarda a resposta da promise para seguir para a próxima linha
  login = async(email, passwd) => {
    const { auth } = this.props
    this.setState({
      authError:'',
      isAuthError: false
    })
    // A função de login exige a utilização de try catch para tratamento de erros
    try{
      // await 
      await auth.signInWithEmailAndPassword(email, passwd)
      // this.setState({
      //   isAuth:true
      // })
    }catch(err){
      this.setState({
        authError: err.code,
        isAuthError: true
      })
    }
  }
  createAccount = async(email, passwd) => {
    const { auth } = this.props
    this.setState({
      signUpError:'',
      isSignUpError: false
    })
    // A função de login exige a utilização de try catch para tratamento de erros
    try{
      // await 
      await auth.createUserWithEmailAndPassword(email, passwd)
      // this.setState({
      //   isAuth:true
      // })
    }catch(err){
      this.setState({
        signUpError: err.code,
        isSignUpError: true
      })
    }
  }

  componentDidMount(){
    const { database, auth } = this.props
    this.setState({ isLoading: true })
    this.comments = database.ref('comments')
    this.comments.on('value', snapshot => {
      this.setState({
        comments: snapshot.val(),
        isLoading: false
      })
    })

    // Captura o status de login atribuido ao navegador se verdadeiro altera o valor de isAuth
    auth.onAuthStateChanged(user =>{
      if(user){
        this.setState({
          isAuth:true,
          user
        })
      }else{
        this.setState({
          isAuth: false,
          user: {}
        })
      }
    })
  }

  logout = () => {
    const { auth } = this.props
    auth.signOut()
  }

  changeScreen = (screen) =>{
    this.setState({
      userScreen: screen
    })
  }
  render() {
    return (
      <div className='container mt-3'>
        {/*Componente de autenticação firebase*/}
        {this.state.isAuth && <User email={this.state.user.email} logout={this.logout}  />}
        { !this.state.isAuth 
          && this.state.userScreen === 'login' &&
          <Login login={this.login} isAuthError={this.state.isAuthError} authError={this.state.authError} changeScreen={this.changeScreen}/> 
        }
        { !this.state.isAuth 
          && this.state.userScreen === 'signup' &&
          <SingUp createAccount={this.createAccount} isSignUpError={this.state.isSignUpError} signUpError={this.state.signUpError} changeScreen={this.changeScreen}/> 
        }

         { /*!this.state.auth && <button></button> */ }
        {/* Comentario em JS */}
        
        { this.state.isAuth && <NewComment sendComment={this.sendComment} />}
        { /*
          Converte o json em string 
          {JSON.stringify(this.state)} 

          O local que estão os dados/var são encaminhados 
          para o componente pela variavel que tem o json no caso o state.
        */}

        <Comments comments={this.state.comments}/>
        {
          this.state.isLoading && <p>Carregando...</p>
        }
      </div>
    )
  }
}

export default App
