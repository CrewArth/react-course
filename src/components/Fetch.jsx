import React, { useEffect, useState } from 'react'

const Fetch = () => {
    
    const [users, setUsers] = useState([]);

    useEffect(()=> {
        async function fetchUsers(){
            try{
                const res = await fetch("https://jsonplaceholder.typicode.com/users")
                const data = await res.json()
                setUsers(data)
            }catch(err){
                console.error(err);
            }
        }
        fetchUsers()
    }, [])
  return (
    <>
    <div>Fetch</div>

    <h2>List</h2>

    {users.map((u) => (
        <div key={u.id}></div>
    ))}
    </>
  )
}

export default Fetch