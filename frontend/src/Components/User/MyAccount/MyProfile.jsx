import React, { useContext, useState } from 'react';
import { MyContext } from '../../../Contexts/Main_context';


//modularizacion

const UserPosts = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h3 className="text-lg font-semibold mb-2">Publicaciones</h3>
            <span>123</span>
            
        </div>
    );
};

const UserComments = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h3 className="text-lg font-semibold mb-2">Comentarios</h3>
            <span>244</span>
            {/* <ul>
                {user.comments.map(comment => (
                    <li key={comment.id} className="text-sm text-gray-600 truncate">
                        {comment.content}
                    </li>
                ))}
            </ul> */}
        </div>
    );
};

const UserLikes = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow mb-8">
            <h3 className="text-lg font-semibold mb-2">Me gusta</h3>
            <span>300</span>
            {/* <ul>
                {user.likes.map(like => (
                    <li key={like.id} className="text-sm text-gray-600 truncate">
                        {like.title}
                    </li>
                ))}
            </ul> */}
        </div>
    );
};

// JUST TESTING
// JUST TESTING
// JUST TESTING
// JUST TESTING
// JUST TESTING
export const MyProfile = () => {
    const [search, setSearch] = useState('');
    const { user } = useContext(MyContext);

    return (
        <div className="p-6 max-w-4xl mx-auto">

            {/* header */}
            <div className="flex items-center space-x-4 mb-6">
                <h2>**IMAGEN**</h2>
                <h2 className="text-2xl font-bold">
                    {user ? user.username : 'No encontrado.'}
                </h2>
            </div>

            {/* modularizacion */}
            <UserPosts />
            <UserComments />
            <UserLikes />

            {/* friends */}
            <div className="bg-white p-4 rounded-lg shadow mb-8">
                <h3 className="text-lg font-semibold mb-4">Amigos</h3>
                <span>250</span>
            </div>

            {/* search friends */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Agregar amigos</h3>
                <div className="flex space-x-2 mb-2">
                    <input
                        type="text"
                        placeholder="Buscar por username"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-grow p-2 border rounded"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-purple-500 text-white px-4 py-2 rounded"
                    >
                        Buscar
                    </button>
                </div>
            </div>
        </div>
    );
};
