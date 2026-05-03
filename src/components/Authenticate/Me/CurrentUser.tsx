import { useEffect, useState } from "react";

export const CurrentUser = () => {
    
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("accessToken")
            const res = await fetch(`https://api.freeapi.app/api/v1/users/current-user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const json = await res.json()
            setData(json)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    if (loading) return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
        </div>
    )
    if (!data?.success) return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
            <div className="bg-neutral-900 border border-red-500/20 rounded-2xl p-8 max-w-sm w-full text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">
                    <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m2-5V7m0 0V5m0 2h2M12 7H10m9 4a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-white font-semibold text-lg">Unauthorized</h2>
                    <p className="text-neutral-500 text-sm mt-1">{data?.message ?? "Invalid access token"}</p>
                </div>
                <span className="inline-block text-xs font-mono bg-neutral-800 text-red-400 px-3 py-1 rounded-full border border-red-500/20">
                    {data?.statusCode ?? 401}
                </span>
            </div>
        </div>
    )

    const user = data.data

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
            <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl overflow-hidden">

                {/* Banner */}
                <div className="h-28 bg-gradient-to-r from-violet-700 via-violet-600 to-indigo-600" />

                <div className="px-8 pb-6">
                    {/* Avatar + Role */}
                    <div className="flex items-end justify-between -mt-12 mb-5">
                        <img
                            src={user.avatar?.url}
                            alt="avatar"
                            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-neutral-900 shadow-lg"
                        />
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full mb-2
              ${user.role === 'ADMIN'
                                ? 'bg-violet-600/20 text-violet-400 ring-1 ring-violet-500/30'
                                : 'bg-blue-600/20 text-blue-400 ring-1 ring-blue-500/30'
                            }`}>
                            {user.role}
                        </span>
                    </div>

                    <h1 className="text-2xl font-bold text-white">@{user.username}</h1>
                    <p className="text-neutral-500 text-sm mt-0.5">{user.email}</p>

                    <div className="border-t border-neutral-800 my-5" />

                    <div className="grid grid-cols-2 gap-4">
                        <InfoCard label="Username" value={user.username} />
                        <InfoCard label="Email" value={user.email} />
                        <InfoCard label="Login Type" value={user.loginType.replace('_', ' ')} />
                        <InfoCard label="Verified" value={user.isEmailVerified ? 'Yes' : 'No'} valueClass={user.isEmailVerified ? 'text-green-400' : 'text-red-400'} />
                        <InfoCard label="Joined" value={new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} />
                        <InfoCard label="Last Updated" value={new Date(user.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} />
                    </div>

                    <div className="border-t border-neutral-800 my-5" />

                    <div className="flex items-center justify-between bg-neutral-800/60 border border-neutral-700 rounded-lg px-4 py-3">
                        <span className="text-xs text-neutral-500 font-medium">User ID</span>
                        <span className="text-xs text-neutral-400 font-mono">{user._id}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function InfoCard({ label, value, valueClass = 'text-white' }: { label: string, value: string, valueClass?: string }) {
    return (
        <div className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-4 space-y-1">
            <p className="text-xs text-neutral-500 font-medium">{label}</p>
            <p className={`text-sm font-semibold truncate ${valueClass}`}>{value}</p>
        </div>
    )
}
