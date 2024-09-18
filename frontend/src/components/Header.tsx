import HeaderLayout from "./header/HeaderLayout";

const Header = () => {

    return (
        <>
        <header className="header fixed top-0 w-full top-0 bg-custom-gray-700 z-50">
            <div className="flex h-16 mx-auto">
                <HeaderLayout />
            </div>

            {/* decoy */}
            
        </header>

        <header className="header sticky top-0 w-full top-0">
            <div className="flex h-16 mx-auto">
            </div>
        </header>
        </>
    )
}

export default Header;