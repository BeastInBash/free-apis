import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
type UserRole = "ADMIN" | "USER" | "";
interface ISignUp {
    email: string,
    password: string,
    role: UserRole,
    username: string,
}
export default function Form() {
    const navigate = useNavigate()
    const initialFormState: ISignUp = {
        email: "",
        password: "",
        role: "USER",
        username: ""
    }
    const [formData, setFormData] = useState(initialFormState)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async () => {
        console.log(formData)
        const res = await fetch(`https://api.freeapi.app/api/v1/users/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    role: formData.role,
                    username: formData.username

                })

            }
        )
        const result = await res.json()

        /*
        * Response Data format
        * data.user
        * user {
            * _id :
            * avatar.url
            * username
            * email
            * role
            * loginType
            * isEmailVerified
            *
    data.message 
            data.success
            * }
            * ERROR: Error response 
            * data.errors[
                * email wrong to email wrong errror
                * username wrong to username: "Message"
                * }]
        * */
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
        console.log(result)
    }
    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl p-8">

                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white">Create Account</h1>
                    <p className="text-neutral-500 text-sm mt-1">Sign up to get started</p>
                </div>

                <div className="space-y-5">

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
                                value={formData.username}
                                placeholder="doejohn"
                                className="bg-transparent w-full text-sm text-white placeholder-neutral-600 outline-none"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-neutral-300">
                            Email
                        </label>
                        <div className="flex items-center gap-3 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 transition-all">
                            <svg className="w-4 h-4 text-neutral-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <input
                                type="email"
                                name="email"
                                placeholder="user.email@domain.com"
                                className="bg-transparent w-full text-sm text-white placeholder-neutral-600 outline-none"
                                value={formData.email}

                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-neutral-300">
                            Password
                        </label>
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

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-neutral-300">
                            Role
                        </label>
                        <div className="flex items-center gap-3 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500 transition-all">
                            <svg className="w-4 h-4 text-neutral-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <select
                                value={formData.role}
                                onChange={handleChange}
                                name="role"
                                className="bg-transparent w-full text-sm text-white outline-none appearance-none cursor-pointer"
                            >
                                <option value="" className="bg-neutral-800 text-neutral-400">Select a role</option>
                                <option value="ADMIN" className="bg-neutral-800 text-white">ADMIN</option>
                                <option value="USER" className="bg-neutral-800 text-white">USER</option>
                            </select>
                            <svg className="w-4 h-4 text-neutral-500 shrink-0 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="w-full mt-2 bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-semibold text-sm py-3 rounded-lg transition-all duration-200 shadow-lg shadow-violet-500/20"
                        onClick={handleSubmit}
                    >
                        Create Account
                    </button>

                </div>

                {/* Footer */}
                <p className="text-center text-neutral-600 text-xs mt-6">
                    Already have an account?{' '}
                    <button onClick={() => navigate('/authentication/login')} className="text-violet-400 hover:text-violet-300 cursor-pointer transition-colors">
                        Sign in
                    </button>
                </p>

            </div>
        </div>
    )
}
