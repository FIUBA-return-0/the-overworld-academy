-- drop type if exists rol cascade;
-- drop type if exists aprobado cascade;
-- drop table if exists carreras cascade;
-- drop table if exists usuario cascade;
-- drop table if exists materias cascade;
-- drop table if exists notas;
-- drop table if exists correlativas;
-- drop table if exists inscripciones;
-- !Los comandos deben ser corridos exacatamente en el orden planteado
create type rol as enum ('alumno', 'profesor', 'director');
create type aprobado as enum ('cursando', 'aprobado');
-- ! entidades elementales
CREATE TABLE carreras (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  duracion INT NOT NULL,
  sede VARCHAR(40) NOT NULL,
  foto text
);
CREATE TABLE usuario (
  nombre VARCHAR(50),
  apellido VARCHAR(20),
  id SERIAL PRIMARY KEY,
  condicion rol NOT NULL,
  username VARCHAR(30) NOT NULL UNIQUE,
  carrera INT REFERENCES carreras(id),
  password TEXT NOT NULL,
  foto text,
  bio text
);
ALTER TABLE carreras
ADD COLUMN director INT REFERENCES usuario(id);
CREATE TABLE materias (
  id SERIAL PRIMARY KEY,
  profesor INT REFERENCES usuario(id),
  nombre VARCHAR(50) NOT NULL,
  carga_horaria INT NOT NULL,
  carrera INT REFERENCES carreras(id),
  foto text,
  descripcion text
);
--! auxiliares:
CREATE TABLE notas (
  id serial primary key,
  alumno SERIAL REFERENCES usuario(id),
  materia SERIAL REFERENCES materias(id),
  description VARCHAR(20) NOT NULL,
  nota INT NOT NULL
);
CREATE TABLE correlativas (
  id serial primary key,
  materia SERIAL REFERENCES materias(id),
  materia_necesaria SERIAL REFERENCES materias(id)
);
CREATE TABLE inscripciones (
  id serial primary key,
  alumno SERIAL REFERENCES usuario(id),
  materia SERIAL REFERENCES materias(id),
  condicion aprobado NOT NULL
);