import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { setAuth } from "../../../helpers/localStorage"
interface ILogin {
    username: string,
    password: string
}
export default function LoginForm() {
    const navigate = useNavigate()
    const initialState: ILogin = {
        username: "",
        password: ""
    }
    const [formData, setFormData] = useState(initialState)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleLogin = async () => {
        const res = await fetch(`https://api.freeapi.app/api/v1/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: formData.password,
                username: formData.username
            })
        })
        const result = await res.json();
        if (!result.success) {

            if (result.errors && Array.isArray(result.errors)) {
                result.errors.forEach((err: Record<string, string>) => {
                    Object.values(err).forEach((msg) => {
                        toast.error(msg);
                    });
                });
            } else {
                toast.error(result.message || "Something went wrong");
            }
            return;
        }
        setAuth(result.data);
        toast.success("Login Successful")
        navigate('/jokes')



    }
    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl p-8">

                {/* Header */}
                <div className="mb-8">
                    <div className="w-12 h-12 bg-violet-600/20 rounded-xl flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white">Welcome back</h1>
                    <p className="text-neutral-500 text-sm mt-1">Sign in to your account</p>
                </div>

                <div className="space-y-5">

                    {/* Username */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-neutral-300">
                            Username
                        </label>
                        <div className="flex items-center gap-3 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 transition-all">
                            <svg className="w-4 h-4 text-neutral-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <input
                                type="text"
                                name="username"
                                placeholder="doejohn"
                                value={formData.username}
                                onChange={handleChange}
                                className="bg-transparent w-full text-sm text-white placeholder-neutral-600 outline-none"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-neutral-300">
                                Password
                            </label>
                            <span className="text-xs text-violet-400 hover:text-violet-300 cursor-pointer transition-colors">
                                Forgot password?
                            </span>
                        </div>
                        <div className="flex items-center gap-3 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 transition-all">
                            <svg className="w-4 h-4 text-neutral-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className="bg-transparent w-full text-sm text-white placeholder-neutral-600 outline-none"
                            />
                        </div>
                    </div>

                    {/* Remember me */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="remember"
                            className="w-4 h-4 rounded border-neutral-600 bg-neutral-800 accent-violet-600 cursor-pointer"
                        />
                        <label htmlFor="remember" className="text-sm text-neutral-400 cursor-pointer">
                            Remember me
                        </label>
                    </div>

                    {/* Submit */}
                    <button
                        type="button"
                        className="w-full mt-2 bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-semibold text-sm py-3 rounded-lg transition-all duration-200 shadow-lg shadow-violet-500/20"
                        onClick={handleLogin}
                    >
                        Sign In
                    </button>

                </div>

                {/* Footer */}
                <p className="text-center text-neutral-600 text-xs mt-6">
                    Don't have an account?{' '}
                    <button onClick={() => navigate('/')} className="text-violet-400 hover:text-violet-300 cursor-pointer transition-colors">
                        Sign up
                    </button>
                </p>

            </div>
        </div>
    )
}
