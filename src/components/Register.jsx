import React from 'react';

const Register = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
        passwordCheck: ''
    })


    
    return (
        <div className="register">
            <h2>New customer? Create an account!</h2>
            <form>
                <label>
                    <span>username: </span>
                    <input type="text" onChange={handleFormChange} />
                </label>
                <label>
                    <span>password: </span>
                    <input type="password" onChange={handleFormChange} />
                </label>
                <input type="submit" value="join" onClick={handleSubmit} />
            </form>
        </div>
    )
}

export default Register;