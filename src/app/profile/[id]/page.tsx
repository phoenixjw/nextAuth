export default function UserProfile({params}: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            <p className="text-4xl">Profile page</p>
            <span className="p-2 rounded ml-2 bg-blue-500 text-black">{params.id}</span>
        </div>
    )
}