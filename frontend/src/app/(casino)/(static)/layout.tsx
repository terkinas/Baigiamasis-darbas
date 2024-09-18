export default function StaticLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <div className="max-w-full lg:max-w-3xl mx-auto text-white py-6 flex flex-col gap-4">
        {children}
        </div>
    );
}