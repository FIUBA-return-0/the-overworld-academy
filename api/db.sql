-- drop type rol cascade;
-- drop type aprobado cascade;
-- drop table carreras cascade;
-- drop table usuario cascade;
-- drop table materias cascade;
-- drop table notas;
-- drop table correlativas;
-- drop table inscripciones;
-- Los comandos deben ser corridos exacatamente en el orden planteado
create type rol as enum ('alumno', 'profesor', 'director');
create type aprobado as enum ('cursando', 'aprobado');
-- ! entidades elementales
CREATE TABLE carreras (
  id INT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  -- director will be added later
  description TEXT NOT NULL,
  duracion INT NOT NULL,
  sede VARCHAR(40) NOT NULL
);
CREATE TABLE usuario (
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(20) NOT NULL,
  id INT PRIMARY KEY,
  condicion rol NOT NULL,
  username VARCHAR(30) NOT NULL,
  carrera INT REFERENCES carreras(id),
  password TEXT NOT NULL
);
ALTER TABLE carreras
ADD COLUMN director INT REFERENCES usuario(id);
CREATE TABLE materias (
  id INT PRIMARY KEY,
  profesor INT REFERENCES usuario(id),
  nombre VARCHAR(50) NOT NULL,
  carga_horaria INT NOT NULL,
  carrera INT REFERENCES carreras(id)
);
--! auxiliares:
CREATE TABLE notas (
  alumno INT REFERENCES usuario(id),
  materia INT REFERENCES materias(id),
  description VARCHAR(20) NOT NULL,
  nota INT NOT NULL
);
CREATE TABLE correlativas (
  materia INT REFERENCES materias(id),
  materia_necesaria INT REFERENCES materias(id)
);
CREATE TABLE inscripciones (
  alumno INT REFERENCES usuario(id),
  materia INT REFERENCES materias(id),
  condicion aprobado NOT NULL
);