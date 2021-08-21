import React, {useState, useEffect} from 'react';

import {loginUser} from '../api';

const Login = () => {
    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    const handleFormChange = () => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentUser = await loginUser(form);
        
    }

    return (
        <div className="login">
            <h2>Welcome back! Log in here.</h2>
            <form>
                <label>
                    <span>username: </span>
                    <input type="text" name="username" value={form.username} onChange={handleFormChange} />
                </label>
                <label>
                    <span>password: </span>
                    <input type="password" name="password" value={form.password} onChange={handleFormChange} />
                </label>
                <input type="submit" value="log in" onClick={handleSubmit} />
            </form>
        </div>
    )
}

export default Login;