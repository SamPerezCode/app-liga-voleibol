import type {
  LigaRegistration,
  ClubRegistration,
  AthleteRegistration,
  CoachRegistration,
  RefereeRegistration,
} from "../types/registrations";

export const ligaRegistrations: LigaRegistration[] = [
  {
    userId: "u-liga-01",
    logoUrl: "/logo-liga-cesar.png",
    departamento: "CESAR",
    municipio: "Valledupar",
    barrio: "Fundadores",
    direccion: "Transversal 23 No 16 B 36",
    telefono2: "3025135818",
    presidente: "Fernando David Lopez Zapata",
    vicepresidente: "Carlos Mejia",
    secretario: "Laura Marcela Velasquez Alvarado",
    tesorero: "Jhon Mendoza Eguiz",
    vocal: "Ana Torres",
    documentos: {
      reconocimientoDeportivo: {
        file: {
          name: "reconocimiento.pdf",
          url: "/docs/reconocimiento.pdf",
        },
        fechaInicio: "2018-02-15",
      },
      personeriaJuridica: {
        file: { name: "personeria.pdf", url: "/docs/personeria.pdf" },
        fechaInicio: "2016-06-01",
        resolucionCategoria: "Resolucion 12345",
      },
    },
  },
];

export const clubRegistrations: ClubRegistration[] = [
  {
    userId: "u-club-01",
    ligaId: "u-liga-01",
    logoUrl: "/logo-liga-cesar.png",
    departamento: "CESAR",
    municipio: "Valledupar",
    barrio: "Los Caciques",
    direccion: "Calle 16 No 5-22",
    telefono2: "3017788990",
    presidente: "Jorge Gomez",
    documentos: {
      reconocimientoDeportivo: {
        file: {
          name: "reconocimiento.pdf",
          url: "/docs/club-reconocimiento.pdf",
        },
        fechaInicio: "2020-03-10",
      },
      personeriaJuridica: {
        file: {
          name: "personeria.pdf",
          url: "/docs/club-personeria.pdf",
        },
        fechaInicio: "2019-05-20",
        resolucionCategoria: "Categoria A",
      },
    },
  },
];

export const athleteRegistrations: AthleteRegistration[] = [
  {
    userId: "u-ath-01",
    fotoUrl: "/athlete-1.jpg",
    birthDate: "2004-03-04",
    birthDept: "CESAR",
    birthCity: "Valledupar",
    residenceDept: "CESAR",
    residenceCity: "Valledupar",
    neighborhood: "Ciudadela Confaccesar",
    address: "Manzana C casa 7A",
    heightCm: 172,
    weightKg: 62,
    bloodType: "A+",
    gender: "Masculino",
    clubDepartamento: "CESAR",
    clubId: "u-club-01",
    position: "Libero",
    documentType: "Cedula de ciudadania",
    documentNumber: "1066864837",
    documentos: {
      identidad: {
        name: "identidad.pdf",
        url: "/docs/ath-01-identidad.pdf",
      },
      registroCivil: {
        name: "registro.pdf",
        url: "/docs/ath-01-registro.pdf",
      },
      certificadoEps: {
        name: "eps.pdf",
        url: "/docs/ath-01-eps.pdf",
      },
    },
  },
  {
    userId: "u-ath-02",
    fotoUrl: "/athlete-2.jpg",
    birthDate: "2005-07-19",
    birthDept: "CESAR",
    birthCity: "Valledupar",
    residenceDept: "CESAR",
    residenceCity: "Valledupar",
    neighborhood: "Los Caciques",
    address: "Calle 16 No 5-22",
    heightCm: 170,
    weightKg: 58,
    bloodType: "O+",
    gender: "Femenino",
    clubDepartamento: "CESAR",
    clubId: "u-club-01",
    position: "Punta",
    documentType: "Tarjeta de identidad",
    documentNumber: "1022334455",
    documentos: {
      identidad: {
        name: "identidad.pdf",
        url: "/docs/ath-02-identidad.pdf",
      },
      registroCivil: {
        name: "registro.pdf",
        url: "/docs/ath-02-registro.pdf",
      },
      certificadoEps: {
        name: "eps.pdf",
        url: "/docs/ath-02-eps.pdf",
      },
    },
  },
  {
    userId: "u-ath-03",
    fotoUrl: "/athlete-3.jpg",
    birthDate: "2003-11-02",
    birthDept: "CESAR",
    birthCity: "Aguachica",
    residenceDept: "CESAR",
    residenceCity: "Valledupar",
    neighborhood: "San Jorge",
    address: "Carrera 12 No 8-30",
    heightCm: 188,
    weightKg: 78,
    bloodType: "B+",
    gender: "Masculino",
    clubDepartamento: "CESAR",
    clubId: "u-club-01",
    position: "Central",
    documentType: "Cedula de ciudadania",
    documentNumber: "1099887766",
    documentos: {
      identidad: {
        name: "identidad.pdf",
        url: "/docs/ath-03-identidad.pdf",
      },
      registroCivil: {
        name: "registro.pdf",
        url: "/docs/ath-03-registro.pdf",
      },
      certificadoEps: {
        name: "eps.pdf",
        url: "/docs/ath-03-eps.pdf",
      },
    },
  },
  {
    userId: "u-shared-01",
    fotoUrl: "/athlete-4.jpg",
    birthDate: "2002-08-14",
    birthDept: "CESAR",
    birthCity: "Valledupar",
    residenceDept: "CESAR",
    residenceCity: "Valledupar",
    neighborhood: "La Nevada",
    address: "Diagonal 9 No 20-11",
    heightCm: 180,
    weightKg: 74,
    bloodType: "O+",
    gender: "Masculino",
    clubDepartamento: "CESAR",
    clubId: "u-club-01",
    position: "Armador",
    documentType: "Cedula de ciudadania",
    documentNumber: "1011223344",
    documentos: {
      identidad: {
        name: "identidad.pdf",
        url: "/docs/ath-04-identidad.pdf",
      },
      registroCivil: {
        name: "registro.pdf",
        url: "/docs/ath-04-registro.pdf",
      },
      certificadoEps: {
        name: "eps.pdf",
        url: "/docs/ath-04-eps.pdf",
      },
    },
  },
];

export const coachRegistrations: CoachRegistration[] = [
  {
    userId: "u-coach-01",
    ligaId: "u-liga-01",
    clubId: "u-club-01",
    fotoUrl: "/coach-1.jpg",
    departamento: "CESAR",
    municipio: "Valledupar",
    barrio: "Centro",
    direccion: "Carrera 9 No 10-20",
    documentType: "Cedula de ciudadania",
    documentNumber: "79998877",
    documentos: {
      identidad: {
        name: "identidad.pdf",
        url: "/docs/coach-identidad.pdf",
      },
      carnetEntrenador: {
        file: { name: "carnet.pdf", url: "/docs/coach-carnet.pdf" },
        resolucionCategoria: "Categoria B",
      },
      hojaDeVida: {
        name: "hoja-vida.pdf",
        url: "/docs/coach-hv.pdf",
      },
      certificadoCursoNacional: {
        file: {
          name: "curso-nacional.pdf",
          url: "/docs/coach-curso-nacional.pdf",
        },
        resolucionCategoria: "Res 5521",
      },
    },
  },
  {
    userId: "u-shared-01",
    ligaId: "u-liga-01",
    clubId: "u-club-01",
    fotoUrl: "/coach-3.jpg",
    departamento: "CESAR",
    municipio: "Valledupar",
    barrio: "La Nevada",
    direccion: "Diagonal 9 No 20-11",
    documentType: "Cedula de ciudadania",
    documentNumber: "1011223344",
    documentos: {
      identidad: {
        name: "identidad.pdf",
        url: "/docs/coach-03-identidad.pdf",
      },
      carnetEntrenador: {
        file: {
          name: "carnet.pdf",
          url: "/docs/coach-03-carnet.pdf",
        },
        resolucionCategoria: "Categoria A",
      },
      hojaDeVida: {
        name: "hoja-vida.pdf",
        url: "/docs/coach-03-hv.pdf",
      },
      certificadoCursoNacional: {
        file: {
          name: "curso-nacional.pdf",
          url: "/docs/coach-03-curso-nacional.pdf",
        },
        resolucionCategoria: "Res 8891",
      },
    },
  },
];

export const refereeRegistrations: RefereeRegistration[] = [
  {
    userId: "u-ref-01",
    fotoUrl: "/referee-1.jpg",
    departamento: "CESAR",
    municipio: "Valledupar",
    barrio: "La Nevada",
    direccion: "Diagonal 9 No 20-11",
    categoria: "Categoria A",
    documentType: "Cedula de ciudadania",
    documentNumber: "1002233445",
    documentos: {
      identidad: {
        name: "identidad.pdf",
        url: "/docs/ref-identidad.pdf",
      },
      hojaDeVida: { name: "hoja-vida.pdf", url: "/docs/ref-hv.pdf" },
      certificadoCursoNacional: {
        file: {
          name: "curso-nacional.pdf",
          url: "/docs/ref-curso-nacional.pdf",
        },
        resolucionCategoria: "Res 2100",
      },
    },
  },
];
