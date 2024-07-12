import Header from "@/components/navigation/navbar/header";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="flex w-full h-full flex-col items-center bg-custom-lighterGreen">
        <main className="flex flex-1 flex-col gap-4 py-4 lg:py-6 lg:gap-6 w-[1300px] min-w-96 h-full">
          {children}
        </main>
      </div>
    </>
  );
};

export default PageLayout;
