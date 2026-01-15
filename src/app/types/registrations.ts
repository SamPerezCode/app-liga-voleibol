export type FileRef = {
  name: string;
  url: string;
};

export type LigaRegistration = {
  userId: string;
  logoUrl?: string;
  departamento: string;
  municipio: string;
  barrio: string;
  direccion: string;
  telefono2?: string;
  presidente: string;
  vicepresidente?: string;
  secretario: string;
  tesorero?: string;
  vocal?: string;
  documentos: {
    reconocimientoDeportivo: {
      file: FileRef;
      fechaInicio: string;
    };
    personeriaJuridica: {
      file: FileRef;
      fechaInicio: string;
      resolucionCategoria: string;
    };
  };
};

export type ClubRegistration = {
  userId: string;
  ligaId: string;
  logoUrl?: string;
  departamento: string;
  municipio: string;
  barrio: string;
  direccion: string;
  telefono2?: string;
  presidente: string;
  documentos: {
    reconocimientoDeportivo: {
      file: FileRef;
      fechaInicio: string;
    };
    personeriaJuridica?: {
      file: FileRef;
      fechaInicio?: string;
      resolucionCategoria?: string;
    };
  };
};

export type AthleteRegistration = {
  userId: string;
  fotoUrl?: string;
  birthDate: string;
  birthDept: string;
  birthCity: string;
  residenceDept: string;
  residenceCity: string;
  neighborhood: string;
  address: string;
  heightCm: number;
  weightKg: number;
  bloodType: string;
  gender: "Masculino" | "Femenino";
  clubDepartamento: string;
  clubId: string;
  position: string;
  documentType: string;
  documentNumber: string;
  documentos: {
    identidad: FileRef;
    registroCivil: FileRef;
    certificadoEps: FileRef;
  };
};

export type CoachRegistration = {
  userId: string;
  ligaId: string;
  clubId: string;
  fotoUrl?: string;
  departamento: string;
  municipio: string;
  barrio: string;
  direccion: string;
  documentType: string;
  documentNumber: string;
  documentos: {
    identidad: FileRef;
    carnetEntrenador: {
      file: FileRef;
      resolucionCategoria: string;
    };
    hojaDeVida: FileRef;
    certificadoCursoNacional?: {
      file: FileRef;
      resolucionCategoria?: string;
    };
    certificadoFivb?: {
      file: FileRef;
      resolucionCategoria?: string;
    };
  };
};

export type RefereeRegistration = {
  userId: string;
  fotoUrl?: string;
  departamento: string;
  municipio: string;
  barrio: string;
  direccion: string;
  categoria: string;
  documentType: string;
  documentNumber: string;
  documentos: {
    identidad: FileRef;
    hojaDeVida: FileRef;
    certificadoCursoNacional?: {
      file: FileRef;
      resolucionCategoria?: string;
    };
    certificadoCursoInternacional?: {
      file: FileRef;
      resolucionCategoria?: string;
    };
    certificadoCursoContinental?: {
      file: FileRef;
      resolucionCategoria?: string;
    };
  };
};
