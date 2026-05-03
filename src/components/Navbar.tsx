import { NavLink, useNavigate } from 'react-router-dom'
import { getUser, logout } from '../helpers/localStorage'
const links = [
    { to: '/', label: '🔐 Auth' },
    { to: '/jokes', label: '😂 Jokes' },
    { to: '/meals', label: '🍽️ Meals' },
    { to: '/products', label: '🛍️ Products' },
    { to: '/quotes', label: '💬 Quotes' },
    { to: '/cats', label: '🐱 Cats' },
    { to: '/user', label: '👤 User' },
    { to: '/youtube', label: '▶️ YouTube' },
]

export default function Navbar() {
    const navigate = useNavigate();
    const user = getUser();
    return (
        <div className="flex w-screen bg-gray-900 border-b border-gray-700 shadow-lg px-6 py-3 items-center justify-between">

            {/* Nav Links */}
            <nav className="flex flex-wrap gap-2">
                {links.map(({ to, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === '/'}
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${isActive
                                ? 'bg-violet-600 text-white shadow-md shadow-violet-500/30'
                                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`
                        }
                    >
                        {label}
                    </NavLink>
                ))}
            </nav>

            {/* User Section */}
            {user ? (
                <>
                    <div  className="flex items-center gap-2 pl-4 border-l border-gray-700">
                        <img
                            src={user.avatar?.url}
                            alt="avatar"
                            className="w-9 h-9 rounded-full object-cover ring-2 ring-violet-500"
                            onClick={() =>  navigate('/me')}
                        />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-white">{user.username}</span>
                            <span className="text-xs text-gray-400">{user.role}</span>
                        </div>
                        <button 
                        onClick={() => logout()}
                        className='text-white ml-8 border border-neutral-500 px-2 py-1 rounded-md outline-none hover:bg-neutral-950'>Logout</button>
                    </div>
                </>
            ) : (
                <div className="flex items-center gap-2 pl-4 border-l border-gray-700">
                    <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <span className="text-sm text-gray-400">Not logged in</span>
                </div>
            )}
        </div>
    )
}
