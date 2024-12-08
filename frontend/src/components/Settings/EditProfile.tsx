import { CiEdit } from "react-icons/ci";

const EditProfile = () => {
  return (
    <div className="w-full h-full flex ">
      <div className="w-auto text-center">
        <div
          id="change-username"
          className="flex text-sm w-full rounded-lg cursor-pointer hover:text-green"
        >
          <CiEdit size={20} />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
