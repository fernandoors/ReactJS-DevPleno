import React, { Component} from 'react'

class SingUp extends Component {
  
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
  createAccount = () => {
    this.props.createAccount (this.state.email, this.state.passwd)
  }
  render(){
    const errorMessages = {
      'auth/weak-password' : 'Insira uma senha mais forte',
      'auth/invalid-email' : 'E-mail inválido',
      'auth/email-already-in-use' : 'E-mail já foi utilizado'
    }
    return (
      <div>
        <h4>Criar Conta</h4>
          <form>
            <input type='text' className='form-control mr-2' onChange={this.handleChange('email')} placeholder='email'></input>
            <input type='password' className='form-control mr-2' onChange={this.handleChange('passwd')} placeholder='password'></input>
            <button type='button' className='btn btn-success' onClick={this.createAccount}>Criar conta</button>
            <button className='btn' onClick={()=> this.props.changeScreen('login')}>Já tem uma conta</button>
          </form>
          {
            this.props.isSignUpError && 
            <div className='card text-white bg-danger mt-3'>
              <div className='card-header'>Erro ao Cadastrar</div>
              <div className='card-body'>
                {errorMessages[this.props.signUpError]}
              </div>
            </div>
          }
        </div>
      )
    }
}

export default SingUp