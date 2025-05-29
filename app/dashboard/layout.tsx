import LeftSideBar from "./LeftSideBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex w-full">
            <LeftSideBar />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}
