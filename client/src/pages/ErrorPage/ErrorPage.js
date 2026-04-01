import './ErrorPage.css'

const ErrorPage = ({error, message}) => {
  return (
    <main className='error_page'>
        <div className='error_code'>{error}</div>
        <div className='error_message'>{message}</div>
    </main>
  )
}

export default ErrorPage