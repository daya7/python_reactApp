import React, {useState,useEffect} from 'react';

const API= process.env.REACT_APP_API;
const Users = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [edit, setEdit] =useState(false);
    const [id, setId] = useState('');

        const handleSubmit= async (e)=>{
            e.preventDefault();

            if(!edit){
                const res= await fetch(`${API}/users`, {
                    method:'POST',
                    headers:{
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                })
                const data = await res.json();
                console.log(data);
            }
            else{
                const res= await fetch(`${API}/user/${id}`, {
                    method:'PUT',
                    headers:{
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                })
                const data= await res.json();
                console.log(data);
            }

            await getUsers();
            setName('');
            setEmail('');
            setPassword('');
        }

        const getUsers = async  ()=>{
            const res= await fetch(`${API}/users`);
            const data = await res.json();
            setUsers(data);
        }
        useEffect(() => {
            getUsers();
        }, [])

        const editUser = async (id) =>{
            const res= await fetch(`${API}/user/${id}`);
            const data = await res.json();
            setEdit(true);
            setId(id);

            setName(data.name);
            setEmail(data.email);
            setPassword(data.password);
        }
        const deleteUser = async (id) =>{
            const userRes = window.confirm('¿Are you sure want to delete this element?');
            if(userRes){
                const res = await fetch(`${API}/user/${id}`, {
                    method:'DELETE',
                })
                const data = await res.json();
                console.log(data);
                await getUsers();
                window.confirm('User Deleted');
            }
        }
    return (
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                        <input type="text" onChange={e=> setName(e.target.value)} value={name} className="form-control" autoFocus placeholder="name"/>
                    </div>
                    <div className="form-group">
                        <input type="email" onChange={e=> setEmail(e.target.value)} value={email} className="form-control"  placeholder="email"/>
                    </div>
                    <div className="form-group">
                        <input type="password" onChange={e=> setPassword(e.target.value)} value={password} className="form-control"  placeholder="password"/>
                    </div>
                    <button className="btn btn-primary col-12">{edit? 'Update':'Create'}</button>
                </form>
            </div>
            <div className="col-md-8">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                       { users.map(user=> (
                            <tr key={user._id}>
                               
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>
                                    <button className="btn btn-secondary btn-sm col-12"onClick={e => editUser(user._id)} > EDIT</button>
                                    <button className="btn btn-danger btn-sm col-12" onClick={e => deleteUser(user._id)} > DELETE</button>
                                </td>
                            </tr>
                        )

                        )

                       }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users
