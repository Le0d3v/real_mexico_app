import { useState, useEffect } from "react";
import useTutor from "../../../hooks/useTutor";
import StudentPersonalForm from "./StudentPersonalForm";
import StudentAddressForm from "./StudentAddressForm";
import TutorSectionForm from "./TutorSectionForm";
import { Info } from "lucide-react";
import { ClipLoader } from "react-spinners";
import useStudent from "../../../hooks/useStudent";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function CreateStudent({
  onClose,
  initialData = null,
  isEdit = false,
}) {
  const { tutores } = useTutor();
  const { createStudent, updateStudent } = useStudent();

  const [cargando, setCargando] = useState(false);

  const [formData, setFormData] = useState({
    student: {},
    address: {},
    tutor: {
      tutor_id: null,
      new_tutor: {},
      relacion: {},
    },
  });

  // 🔥 HIDRATACIÓN PARA EDICIÓN
  useEffect(() => {
    if (initialData) {
      setFormData({
        student: {
          nombre: initialData.nombre,
          apellido_paterno: initialData.apellido_paterno,
          apellido_materno: initialData.apellido_materno,
          fecha_nacimiento: initialData.fecha_nacimiento,
          curp: initialData.curp,
          genero: initialData.genero,
          grado: initialData.grado,
          grupo: initialData.grupo,
          entidad_nacimiento: initialData.entidad_nacimiento,
          tipo_sangre: initialData.tipo_sangre,
          lengua_materna: initialData.lengua_materna,
          discapacidad: initialData.discapacidad,
        },
        address: initialData.domicilio || {},
        tutor: {
          tutor_id: initialData.tutores?.[0]?.id || null,
          new_tutor: {},
          relacion: {
            parentesco: initialData.tutores?.[0]?.pivot?.parentesco || "",
            responsable_pagos:
              initialData.tutores?.[0]?.pivot?.responsable_pagos || 0,
            contacto_principal:
              initialData.tutores?.[0]?.pivot?.contacto_principal || 0,
          },
        },
      });
    }
  }, [initialData]);

  // =========================
  // HANDLERS (SIN CAMBIOS)
  // =========================
  const handleStudentChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      student: {
        ...prev.student,
        [field]: value,
      },
    }));
  };

  const handleAddressChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handleTutorChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      tutor: {
        ...prev.tutor,
        [field]: value,
      },
    }));
  };

  const handleNewTutorChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      tutor: {
        ...prev.tutor,
        new_tutor: {
          ...prev.tutor.new_tutor,
          [field]: value,
        },
      },
    }));
  };

  const handleTutorRelationChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      tutor: {
        ...prev.tutor,
        relacion: {
          ...prev.tutor.relacion,
          [field]: value,
        },
      },
    }));
  };

  // SUBMIT DINÁMICO
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      let response;

      if (isEdit) {
        response = await updateStudent(initialData.id, formData);
      } else {
        response = await createStudent(formData);
      }

      //toast.success(response.message);
      Swal.fire({
        icon: "success",
        title: isEdit
          ? "Estudiante Actualizado Exitosamente"
          : "Estudiante Registrado Exitosamente",
        text: "Los cambios se han guardado en la Base de Datos.",
        confirmButtonText: "Aceptar",
      });
      onClose();
    } catch (error) {
      if (error?.status === 422) {
        Object.values(error.data.errors).forEach((messages) =>
          messages.forEach((message) => toast.error(message)),
        );
      } else {
        toast.error(
          isEdit
            ? "Error al actualizar el estudiante."
            : "Error al registrar el estudiante.",
        );
      }

      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex gap-1 items-center mb-3">
        <Info />
        <p>
          {isEdit
            ? "Modifique la información del alumno"
            : "Complete el siguiente formulario para inscribir a un Alumno"}
        </p>
      </div>

      <div>
        <form onSubmit={handleSubmitForm} noValidate className="space-y-8">
          {/* FORMULARIOS */}
          <StudentPersonalForm
            form={formData.student}
            onChange={handleStudentChange}
          />

          <StudentAddressForm
            form={formData.address}
            onChange={handleAddressChange}
          />

          {isEdit ? (
            <></>
          ) : (
            <TutorSectionForm
              tutores={tutores}
              selectedTutorId={formData.tutor.tutor_id} // 👈 opcional si tu componente lo soporta
              onTutorSelect={(id) => handleTutorChange("tutor_id", id)}
              onNewTutorChange={handleNewTutorChange}
              onRelationChange={handleTutorRelationChange}
              initialRelation={formData.tutor.relacion} // 👈 opcional
            />
          )}

          {/* ACCIONES */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-between gap-4 items-center">
            <h1 className="text-3xl font-semibold text-red-400">
              {isEdit ? "Editar" : "Acciones"}
            </h1>

            <div className="flex gap-5">
              <button
                type="button"
                className="px-6 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                onClick={() => onClose()}
              >
                Cerrar
              </button>

              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow-sm cursor-pointer w-44"
              >
                {cargando ? (
                  <ClipLoader size={20} color="white" />
                ) : (
                  <p>{isEdit ? "Guardar Cambios" : "Inscribir Alumno"}</p>
                )}
              </button>
            </div>
          </section>
        </form>
      </div>
    </>
  );
}
