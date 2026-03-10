import { Home, MapPin, Hash } from "lucide-react";

import InputField from "../components/InputField";
import SelectField from "../components/SelectField";

import { estados } from "../../../helpers/data";

export default function StudentAddressForm({ form, onChange }) {
    return (
        <section className="bg-gray-50 rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-gray-300 pb-4">
                <div className="p-2 flex items-center justify-center rounded-full bg-red-200">
                    <Home className="w-8 h-8 text-red-600" />
                </div>

                <h2 className="text-2xl font-semibold text-gray-800">
                    Datos de Domicilio
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    icon={<MapPin size={18} />}
                    label="Calle"
                    value={form.calle}
                    onChange={(e) => onChange("calle", e.target.value)}
                />

                <InputField
                    icon={<Hash size={18} />}
                    label="Número Exterior"
                    value={form.numero_exterior}
                    onChange={(e) =>
                        onChange("numero_exterior", e.target.value)
                    }
                />

                <InputField
                    icon={<Hash size={18} />}
                    label="Número Interior"
                    value={form.numero_interior}
                    onChange={(e) =>
                        onChange("numero_interior", e.target.value)
                    }
                />

                <InputField
                    icon={<MapPin size={18} />}
                    label="Colonia"
                    value={form.colonia}
                    onChange={(e) => onChange("colonia", e.target.value)}
                />

                <InputField
                    icon={<MapPin size={18} />}
                    label="Localidad"
                    value={form.localidad}
                    onChange={(e) => onChange("localidad", e.target.value)}
                />

                <InputField
                    icon={<MapPin size={18} />}
                    label="Municipio"
                    value={form.municipio}
                    onChange={(e) => onChange("municipio", e.target.value)}
                />

                <SelectField
                    icon={<MapPin size={18} />}
                    label="Estado"
                    options={estados}
                    value={form.estado}
                    onChange={(e) => onChange("estado", e.target.value)}
                />

                <InputField
                    icon={<Hash size={18} />}
                    label="Código Postal"
                    value={form.cp}
                    onChange={(e) => onChange("cp", e.target.value)}
                />
            </div>
        </section>
    );
}
