import { Spinner } from "@/components/ui/spinner";

const Loader = () => {
  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center h-full">
      <Spinner />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
