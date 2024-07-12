import Header from "@/components/navigation/navbar/header";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default PageLayout;
