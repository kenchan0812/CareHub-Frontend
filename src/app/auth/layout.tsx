import Header from "@/components/navigation/navbar/header";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="h-screen flex items-center justify-center bg-custom-lighterGreen">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
