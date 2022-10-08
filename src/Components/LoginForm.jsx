import { Toggable } from './Toggable'

export const LoginForm = (props) => {
  return (
    <Toggable buttonLabel='Show login'>
      <form onSubmit={props.handleSubmit}>
        <div>
          <input
            type='text'
            value={props.username}
            name='username'
            placeholder='Username'
            onChange={props.handleUsernameChange}
          />
        </div>
        <div>
          <input
            type='password'
            value={props.password}
            name='password'
            placeholder='Password'
            onChange={props.handlePasswordChange}
          />
        </div>
        <button>Login</button>
      </form>
    </Toggable>
  )
}
