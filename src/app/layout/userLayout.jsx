import Footer from "@/components/footer"
import Head from "@/components/nav/head"
import SideBar from "@/components/nav/sideBar"
import Search from "@/components/search"

const UserLayout = ({ children, currentUser }) => {
    return (
        <div className="flex">
            <div className="hidden lg:block">
                <SideBar />
            </div>
            <div className="w-full bg-base-300">
                <div className="w-full min-h-screen h-auto" >
                    <Head photoUser={currentUser.data[0].image} />
                    <div className="w-full md:px-5 animateOpacity">
                        <div className="px-2 mt-2 md:mt-0 md:px-0 md:hidden sticky top-[69px] z-10">
                            <Search />
                        </div>
                        <main>{children}</main>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLayout