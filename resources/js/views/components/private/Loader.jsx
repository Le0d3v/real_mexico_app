import { PacmanLoader } from "react-spinners";

export default function Loader() {
    return (
        <div className="w-full h-100 flex justify-center items-center">
            <div className="">
                <div className="mt-7">
                    <div className="flex justify-center">
                        <PacmanLoader color="#30bb95" size={40} />
                    </div>
                    <h1 className="text-lg text-center mt-3">
                        Cargando Información...
                    </h1>
                </div>
            </div>
        </div>
    );
}
