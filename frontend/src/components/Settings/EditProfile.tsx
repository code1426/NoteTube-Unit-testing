import UpdateUsernameForm from "./UpdateUsernameForm";
const EditProfile = () => {
  return (
    <div className="w-full h-full flex ">
      <div className="w-auto text-center">
        <div
          id="change-username"
          className="flex text-sm w-full rounded-lg cursor-pointer hover:text-green"
        >
          <UpdateUsernameForm />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
