import SideNavProvider from "@/components/navigation/sidenav/side-nav-provider";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="grid min-h-screen grid-cols-2 w-full  md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="bg-[#A1A4E3] flex-1 place-content-center ">
          <SideNavProvider />
        </div>
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
