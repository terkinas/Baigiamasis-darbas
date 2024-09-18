export default function AdminPage() {

    return (
        <div className="w-full lg:max-w-[calc(100vw-16rem)] px-4 py-10 md:p-10 text-custom-gray-100">
            <div className="w-full flex flex-col gap-6">
                <h4 className="text-xl md:text-3xl">Admin Panel</h4>
                <hr  />
                <p className="text-custom-gray-400">Welcome to the admin panel. Here you can manage users, games, and other settings.</p>

                <button className="w-fit p-3 px-6 bg-custom-gray-800 text-custom-green-500 border border-1 border-custom-green-500 rounded hover:bg-custom-gray-700">Statistics</button>
                <button className="w-fit p-3 px-6 bg-custom-gray-800 text-custom-green-500 border border-1 border-custom-green-500 rounded hover:bg-custom-gray-700">Manage Users</button>
                <button className="w-fit p-3 px-6 bg-custom-gray-800 text-custom-green-500 border border-1 border-custom-green-500 rounded hover:bg-custom-gray-700">Manage Wallets</button>

            </div>
        </div>
    )
}