import { useAppContext } from "../Context";

const Main = () => {
  const { name, setName } = useAppContext();
  return (
    <div className="flex bg-white-100 font-sans items-center flex-col justify-between h-screen">
      <div className="flex items-center flex-col pt-10">
        <h1 className="font-bold mb-4 text-gray-900 text-5xl lg:text-7xl text-center ">Hi</h1>
        <input
          placeholder={"Enter your name"}
          onChange={e => setName(e.currentTarget.value)}
          style={{ background: "#8080802e" }}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full text-2xl border-gray-300 rounded-md p-2"
        />
      </div>
    </div>
  );
};

export default Main;
