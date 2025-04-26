import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div className="errorPage">
            <b>
                <p>You need to be logged in to proceed.</p>
            </b>

            <Link to='/login'>
                <button>Login</button>
            </Link>
            <Link to='/register'>
                <button>Register</button>
            </Link>
        </div>
    )
}

export default ErrorPage;