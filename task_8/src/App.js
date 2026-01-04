// import Foo from "./Foo";

// function App() {
//   return (
//     <div>
//       <Foo />
//       <Foo />
//       <Foo />
//     </div>
//   );
// }

// export default App;


// === src/App.js (THIS IS YOUR FRONTEND) ===
import React, { useState } from 'react';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Login to get the token
        const loginResponse = await fetch('http://localhost:89/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (loginResponse.status !== 201) {
            alert('Invalid username and/or password');
            return;
        }

        const loginJson = await loginResponse.json();
        const token = loginJson.token;

        // 2. Use token to get secret data
        const secretResponse = await fetch('http://localhost:89/', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            },
        });

        const secretJson = await secretResponse.json();
        alert('The secret data is: ' + secretJson.data);
    };

    return (
        <div style={{ padding: '50px' }}>
            <h1>Login to access secret data</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" style={{ marginTop: '20px' }}>Login</button>
            </form>
        </div>
    );
}

export default App;