import React, { Component} from 'react'

class Login extends Component {
  
  state = {
    email: '',
    passwd: ''
  }
  //  O handleChange com a função field setada captura dinamicamente os valores do handle conforme o input implementado no caso input email altera o campo email sem setar no handle manualmente
  handleChange = field => event => {
    this.setState({
      [field]: event.target.value
    })
  }

  // construtor da função login do componente abaixo
  login = () => {
    this.props.login (this.state.email, this.state.passwd)
  }
  render(){
    const errorMessages = {
      'auth/wrong-password' : 'E-mail e/ou senha inválidos',
      'auth/user-not-found' : 'Usuário não encontrado',
      'auth/invalid-email' : 'E-mail inválido'
    }
    return (
      <div>
        <h4>Entre para comentar:</h4>
        <form className='form-inline'>
          <input type='text' className='form-control mr-2' onChange={this.handleChange('email')} placeholder='email'></input>
          <input type='password' className='form-control mr-2' onChange={this.handleChange('passwd')} placeholder='password'></input>
          <button type='button' className='btn btn-success' onClick={this.login}>Entrar</button>
          <button className='btn' onClick={() => this.props.changeScreen('signup')}>Criar conta</button>
        </form>
          {
            this.props.isAuthError && 
            <div className='card text-white bg-danger mt-3'>
              <div className='card-header'>Erro ao entrar</div>
                <div className='card-body'>
                  {errorMessages[this.props.authError]}
                </div>
              </div>
          }
      </div>
      )
    }
}

export default Login