import UserSettingForm from "@/components/customer/user-setting/user-setting-form";

const Settings = () => {
  return (
    <div className="min-h-[833px]">
      <div className="flex-1 rounded-lg border border-dashed shadow-sm bg-white">
        <div className="container py-10 flex justify-center">
          <UserSettingForm />
        </div>
      </div>
    </div>
  );
};

export default Settings;
