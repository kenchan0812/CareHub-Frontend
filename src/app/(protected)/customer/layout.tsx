import SideNavCustomer from "@/components/navigation/sidenav/side-nav-customer";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid min-h-screen grid-cols-2 w-full  md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="bg-[#A1A4E3] flex-1 place-content-center ">
        <SideNavCustomer />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default PageLayout;
