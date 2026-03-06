export default function SelectField({
    icon,
    label,
    options = [],
    value,
    onChange,
}) {
    const isObjectOption = (opt) => typeof opt === "object" && opt !== null;

    return (
        <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-200 focus-within:ring-2 focus-within:ring-red-500 transition">
            <div className="text-red-600 mt-1">{icon}</div>

            <div className="w-full">
                <label className="text-sm text-gray-500 block mb-1">
                    {label}
                </label>

                <select
                    className="w-full bg-transparent outline-none text-gray-800 font-medium rounded"
                    value={value}
                    onChange={onChange}
                    required
                >
                    <option value="">Seleccione una opción</option>

                    {options.map((opt, index) => {
                        if (isObjectOption(opt)) {
                            return (
                                <option
                                    key={opt.value ?? index}
                                    value={opt.value}
                                >
                                    {opt.label}
                                </option>
                            );
                        }

                        return (
                            <option key={index} value={opt}>
                                {opt}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
}
