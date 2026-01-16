import { useState } from "react";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";

const ProfilePassword = () => {
  const [show, setShow] = useState(false);
  const type = show ? "text" : "password";

  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-semibold text-slate-700">
          Contrasena actual
        </label>
        <Input type={type} />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-700">
          Nueva contrasena
        </label>
        <Input type={type} />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-700">
          Confirmar nueva contrasena
        </label>
        <Input type={type} />
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-600">
        <input
          type="checkbox"
          checked={show}
          onChange={() => setShow((v) => !v)}
        />
        Mostrar contrasena
      </label>

      <div className="flex justify-center">
        <Button className="bg-slate-600 hover:bg-slate-700">
          Cambiar contrasena
        </Button>
      </div>
    </div>
  );
};

export default ProfilePassword;
