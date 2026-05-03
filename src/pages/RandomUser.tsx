import { useEffect, useState } from "react"

interface UserName {
  title: string
  first: string
  last: string
}

interface UserLocation {
  street: { number: number; name: string }
  city: string
  state: string
  country: string
  postcode: string | number
  coordinates: { latitude: string; longitude: string }
  timezone: { offset: string; description: string }
}

interface UserLogin {
  uuid: string
  username: string
}

interface UserDob {
  date: string
  age: number
}

interface UserPicture {
  large: string
  medium: string
  thumbnail: string
}

interface UserData {
  id: number
  gender: string
  name: UserName
  location: UserLocation
  email: string
  login: UserLogin
  dob: UserDob
  registered: UserDob
  phone: string
  cell: string
  picture: UserPicture
  nat: string
}

interface InfoRowProps {
  icon: React.ReactNode
  label: string
  value: string
}

const InfoRow = ({ icon, label, value }: InfoRowProps) => (
  <div className="flex items-start gap-3 py-3 border-b border-stone-100 last:border-0">
    <span className="text-stone-400 mt-0.5 shrink-0">{icon}</span>
    <div className="min-w-0">
      <p className="text-xs text-stone-400">{label}</p>
      <p className="text-sm text-stone-700 font-medium truncate">{value}</p>
    </div>
  </div>
)

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-2 py-0.5 text-xs bg-stone-100 text-stone-600 rounded-full border border-stone-200">
    {children}
  </span>
)

const SkeletonCard = () => (
  <div className="bg-white border border-stone-200 rounded-2xl p-6 animate-pulse space-y-4">
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 rounded-full bg-stone-100 shrink-0" />
      <div className="space-y-2 flex-1">
        <div className="h-5 bg-stone-100 rounded w-2/3" />
        <div className="h-3 bg-stone-100 rounded w-1/3" />
        <div className="h-3 bg-stone-100 rounded w-1/2" />
      </div>
    </div>
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="h-10 bg-stone-100 rounded" />
    ))}
  </div>
)

const UserCard = ({ user }: { user: UserData }) => {
  const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`
  const address = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`
  const dob = new Date(user.dob.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  const registered = new Date(user.registered.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })

  return (
    <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* <div className="h-16 bg-stone-800" /> */}
      <div className="px-6 py-10">
        <div className="flex items-end bg-stone-800 gap-4 -mt-10 mb-4 rounded-r-xl rounded-l-full">
          <img
            src={user.picture.large}
            alt={fullName}
            className="w-20 h-20 rounded-full border-4 border-white shadow-sm object-cover shrink-0"
          />
          <div className=" min-w-0 mb-4 ">
            <h3 className="text-base font-bold  text-white truncate">{fullName}</h3>
            <p className="text-xs text-stone-400">@{user.login.username}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <Badge>{user.gender === "male" ? "♂ Male" : "♀ Female"}</Badge>
          <Badge>🌍 {user.nat}</Badge>
          <Badge>🎂 Age {user.dob.age}</Badge>
          <Badge>📅 Since {registered}</Badge>
        </div>

        <div className="divide-y divide-stone-100">
          <InfoRow
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
            label="Email"
            value={user.email}
          />
          <InfoRow
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            }
            label="Phone"
            value={user.phone}
          />
          <InfoRow
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            }
            label="Cell"
            value={user.cell}
          />
          <InfoRow
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            label="Address"
            value={address}
          />
          <InfoRow
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            label="Date of Birth"
            value={`${dob} (${user.dob.age} years old)`}
          />
          <InfoRow
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            label="Timezone"
            value={`${user.location.timezone.offset} — ${user.location.timezone.description}`}
          />
        </div>
      </div>
    </div>
  )
}

export const RandomUser = () => {
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [genderFilter, setGenderFilter] = useState<"all" | "male" | "female">("all")

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("https://api.freeapi.app/api/v1/public/randomusers")
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const json = await res.json()
      setUsers(json.data?.data ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const filtered = users.filter((u) => {
    const fullName = `${u.name.first} ${u.name.last}`.toLowerCase()
    const matchSearch =
      fullName.includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.location.country.toLowerCase().includes(search.toLowerCase())
    const matchGender = genderFilter === "all" || u.gender === genderFilter
    return matchSearch && matchGender
  })

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-stone-800 tracking-tight">Random Users</h1>
              {!loading && (
                <p className="text-xs text-stone-400 mt-0.5">
                  {filtered.length} of {users.length} users
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex bg-stone-100 rounded-lg p-0.5 text-xs font-medium">
                {(["all", "male", "female"] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGenderFilter(g)}
                    className={`px-3 py-1.5 rounded-md capitalize transition-all duration-150 ${
                      genderFilter === g
                        ? "bg-white text-stone-800 shadow-sm"
                        : "text-stone-500 hover:text-stone-700"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search name, email, country…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:bg-white transition w-56"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              <button
                onClick={fetchUsers}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-stone-800 text-white text-sm font-medium rounded-lg hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed transition active:scale-95"
              >
                <svg className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-stone-600 font-medium">No users found</p>
            <p className="text-stone-400 text-sm mt-1">Try adjusting your search or filters</p>
            <button
              onClick={() => { setSearch(""); setGenderFilter("all") }}
              className="mt-4 px-4 py-2 text-sm bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((user) => (
              <UserCard key={user.login.uuid} user={user} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
