drop type if exists rol cascade;
drop type if exists aprobado cascade;
drop table if exists carreras cascade;
drop table if exists usuario cascade;
drop table if exists materias cascade;
drop table if exists notas;
drop table if exists correlativas;
drop table if exists inscripciones;
-- Los comandos deben ser corridos exacatamente en el orden planteado
create type rol as enum ('alumno', 'profesor', 'director');
create type aprobado as enum ('cursando', 'aprobado');
-- ! entidades elementales
CREATE TABLE carreras (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  duracion INT NOT NULL,
  sede VARCHAR(40) NOT NULL
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
  carrera INT REFERENCES carreras(id)
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
-- Insertar carreras
INSERT INTO carreras (nombre, description, duracion, sede)
VALUES 
('Diseño Multimedial', 'Carrera enfocada en diseño UX/UI y medios digitales', 4, 'Buenos Aires'),
('Ingeniería Informática', 'Carrera orientada al desarrollo de software y sistemas', 5, 'Buenos Aires');

select * from usuario;
update usuario u
set password = '$2b$12$qsNXgHSzkVycI3whbS1DWO6QfRUxbT9Zh69435vOu1CkulN7x9K/O'
where u.id = 8;
     select * from usuario u
        where u.username = 'sgonzalez';

-- Insertar director
INSERT INTO usuario (nombre, apellido, condicion, username, carrera, password, foto)
VALUES 
	('Lucía', 'Martínez', 'director', 'lmartinez', 2, 'password123', 'Directora de la carrera de laotra carrera'),
	('Manuel','Camejo','director','manuecamejo',1,'manucamejo123','Director de ingenieria en info');
select * from usuario where condicion = 'director';
-- Asignar director a la carrera

UPDATE carreras SET director = 2 WHERE id = 2;
update carreras set director = 1 where id =1;
select  * from carreras;
-- Insertar profesor
INSERT INTO usuario (nombre, apellido, condicion, username, carrera, password, foto)
VALUES ('Carlos', 'Gómez', 'profesor', 'cgomez', 1, 'pass456', 'Profesor de programación');

-- Insertar alumnos (algunos en carrera 1, otros en carrera 2)
INSERT INTO usuario (nombre, apellido, condicion, username, carrera, password, foto)
VALUES 
('Ana', 'Pérez', 'alumno', 'aperez', 1, 'pass789', 'Estudiante de primer año'),
('Diego', 'Lopez', 'alumno', 'dlopez', 1, 'pass321', 'Estudiante de segundo año'),
('Valentina', 'Ríos', 'alumno', 'vrios', 2, 'pass111', 'Interesada en desarrollo web'),
('Mateo', 'Fernández', 'alumno', 'mfernandez', 1, 'pass222', 'Apasionado por la inteligencia artificial'),
('Sofía', 'González', 'alumno', 'sgonzalez', 2, 'pass333', 'Fanática del diseño UX/UI'),
('Lucas', 'Martín', 'alumno', 'lmartin', 1, 'pass444', 'Le gusta programar videojuegos'),
('Camila', 'Ramírez', 'alumno', 'cramirez', 2, 'pass555', 'Quiere especializarse en ciberseguridad'),
('Tomás', 'Silva', 'alumno', 'tsilva', 1, 'pass666', 'Interesado en la programación competitiva'),
('Agustina', 'Morales', 'alumno', 'amorales', 2, 'pass777', 'Estudiante comprometida con el software libre'),
('Franco', 'López', 'alumno', 'flopez', 2, 'pass888', 'Curioso por los sistemas embebidos');

-- Insertar materias (solo para carrera 1)
INSERT INTO materias (profesor, nombre, carga_horaria, carrera)
VALUES 
(2, 'Programación I', 64, 1),
(2, 'Estructuras de Datos', 64, 1),
(2, 'Algoritmos', 64, 1);

-- Correlatividades
INSERT INTO correlativas (materia, materia_necesaria)
VALUES 
(2, 1),
(3, 2);

-- Inscripciones (solo alumnos de carrera 1)
INSERT INTO inscripciones (alumno, materia, condicion)
VALUES 
(3, 1, 'aprobado'),
(3, 2, 'cursando'),
(4, 1, 'cursando'),
(5, 1, 'cursando'),
(7, 1, 'aprobado'),
(7, 2, 'cursando'),
(8, 1, 'cursando'),
(10, 1, 'cursando'),
(12, 1, 'aprobado'),
(12, 2, 'aprobado'),
(12, 3, 'cursando');

-- Notas
INSERT INTO notas (alumno, materia, description, nota)
VALUES 
(3, 1, 'Parcial 1', 8),
(3, 1, 'Parcial 2', 9),
(4, 1, 'Parcial 1', 6),
(5, 1, 'Parcial 1', 7),
(7, 1, 'Final', 9),
(7, 2, 'Parcial 1', 7),
(8, 1, 'Parcial 1', 5),
(10, 1, 'Parcial 1', 6),
(12, 1, 'Final', 9),
(12, 2, 'Final', 8),
(12, 3, 'Parcial 1', 6);

delete from carreras
where id =4;

select * from carreras;
insert into carreras(nombre,description,duracion,sede)
values ('abogacia', 'que se yo', 4, 'Buenos Aires');