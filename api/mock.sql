INSERT INTO carreras (nombre, description, duracion, sede, foto)
VALUES
('Tecnicatura Universitaria en Tacticas de Rush', 'Buscamos mejorar tus habilidades dentro del campo de batalla.', 3, 'Paseo Colonizado', 'https://i.imgur.com/53piOAe.png'),
('Ingenieria en granjas', 'Aprende a jugar como todo un tecnico, de los verdaderos.', 5, 'Paseo Colonizado', 'https://i.imgur.com/CTKFo91.png'),
('Tecnicatura de Estrategias Criminales', '', 3, 'Paseo Colonizado', 'https://i.imgur.com/HZ1IY3E.png'),
('Licenciatura en Glitcheo Etico', 'No es trampa si lo permite el motor del juego', 4, 'Ciudadini Universitarini', 'https://i.imgur.com/E6VbzGm.png');

-- Directores
INSERT INTO usuario (nombre, apellido, condicion, carrera, foto, bio, username, password)
VALUES
('Mariano', 'Mendez', 'director', 1, '/img/pp1.png', '', 'mendezm', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Bernardo', 'Bustamante', 'director', 2, '/img/pp2.png', '', 'berbustamente', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Cecilia', 'Rivas', 'director', 3, '/img/pp3.png', '', 'ceciliarivas', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Gregorio', 'Lichtenstein', 'director', 4, '/img/pp4.png', '', 'lichtensteingreg', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'); -- Default1$

UPDATE carreras SET director=1 where id=1;
UPDATE carreras SET director=2 where id=2;
UPDATE carreras SET director=3 where id=3;
UPDATE carreras SET director=4 where id=4;

-- Profesores
INSERT INTO usuario (nombre, apellido, condicion, carrera, foto, bio, username, password)
VALUES
('Carlos', 'Maulhardt', 'profesor', 4, '/img/pp1.png', 'bio', 'carlosmaulhardt', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Ernesto', 'Morales', 'profesor', 2, '/img/pp2.png', 'bio', 'moralesernesto', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Veronica', 'Bustos', 'profesor', 2, '/img/pp3.png', 'bio', 'vbustos', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Daniel', 'Vargas', 'profesor', 2, '/img/pp4.png', 'bio', 'vardaniel', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDav'), -- Default1$
('ElRich', 'MC', 'profesor', 2, '/img/pp5.png', '', 'elrichmc', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Lara', 'Bedrock', 'profesor', 4, '/img/pp12.png', '', 'profbedrock', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Axel', 'Rushinsky', 'profesor', 4, '/img/pp23.png', '', 'plantmasterrush', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Zoe', 'Stormwatch', 'profesor', 1, '/img/pp3.png', '', 'zonastormwatch', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Bruno', 'Peekman', 'profesor', 1, '/img/pp2.png', '', 'tacticpeekman', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Sofia', 'Crateris', 'profesor', 1, '/img/pp17.png', '', 'chunksofia', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Dante', 'Clipwalker', 'profesor', 1, '/img/pp3.png', '', 'exploitsensei', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Valentina', 'Respawna', 'profesor', 1, '/img/pp6.png', 'valrespawna', '', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Marcos', 'Ghostline', 'profesor', 1, '/img/pp12.png', '', 'profghostline', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Eliana', 'Mobsworth', 'profesor', 3, '/img/pp14.png', '', 'elianamobsworth', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Ian', 'Driftwood', 'profesor', 3, '/img/pp23.png', '', 'driftwoodian', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Bianca', 'Shadestone', 'profesor', 3, '/img/pp23.png', '', 'biancashade', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Tomas', 'Crossfire', 'profesor', 3, '/img/pp24.png', '', 'crossfiretomas', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Camila', 'Healgrave', 'profesor', 3, '/img/pp5.png', '', 'camilahg', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'); -- Default1$

--- Alumnos: Tecnicatura Universitaria en Tacticas de Rush
INSERT INTO usuario (nombre, apellido, condicion, carrera, foto, bio, username, password)
VALUES
('Oscar', 'Canellas Colocho', 'alumno', 1, '/img/pp1.png', '', 'mixwell', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Tyson', 'Ngo', 'alumno', 1, '/img/pp17.png', '', 'tenzz', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Lucas', 'Espindola', 'alumno', 1, '/img/pp18.png', '', 'zekko', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Abril', 'Sanchez', 'alumno', 1, '/img/pp19.png', '', 'abrusanchez', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Facundo', 'Vila', 'alumno', 1, '/img/pp16.png', '', 'facundovila', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Hugo', 'Castro', 'alumno', 1, '/img/pp15.png', '', 'cashugo', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Diego', 'De Marco', 'alumno', 1, '/img/pp14.png', '', 'dimarcusdie', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Isabella', 'Navarro', 'alumno', 1, '/img/pp13.png', '', 'isanavarro', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'); -- Default1$

--- Alumnos:  Ingenieria en granjas
INSERT INTO usuario (nombre, apellido, condicion, carrera, foto, bio, username, password)
VALUES
('Ivan', 'Buhaje', 'alumno', 2, '/img/pp1.png', '', 'spreen', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Samuel', 'De Luque', 'alumno', 2, '/img/pp2.png', '', 'vegetta777', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Guillermo', 'Diaz Ibaniez', 'alumno', 2, '/img/pp1.png', '', 'willyrex', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Oscar', 'Lobo', 'alumno', 2, '/img/pp2.png', '', 'oscurlord', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'); -- Default1$

--- Alumnos:  Tecnicatura en Lectura de Enemigos y Mindgames Avanzados
INSERT INTO usuario (nombre, apellido, condicion, carrera, foto, bio, username, password)
VALUES
('Carolina', 'Pizzulini', 'alumno', 3, '/img/pp6.png', '', 'Fluorescent', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Thiago', 'Lapp', 'alumno', 3, '/img/pp2.png', '', 'kingone', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Simon', 'Alcaraz', 'alumno', 3, '/img/pp22.png', '', 'mongraal', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Maria Gabriela', 'Martin', 'alumno', 3, '/img/pp23.png', '', 'asannagura', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Luciana', 'Paredes', 'alumno', 3, '/img/pp24.png', '', 'luparedes', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Mateo', 'Villalba', 'alumno', 3, '/img/pp25.png', '', 'mvillalba', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Valentina', 'Salazar', 'alumno', 3, '/img/pp12.png', '', 'vsalazar', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Santiago', 'Luna', 'alumno', 3, '/img/pp13.png', '', 'lunasanti', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'); -- Default1$

--- Alumnos:  Licenciatura en Glitcheo etico y Uso Creativo de Bugs
INSERT INTO usuario (nombre, apellido, condicion, carrera, foto, bio, username, password)
VALUES
('Facundo', 'Perez', 'alumno', 4, '/img/pp19.png', '', 'bananagamer', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa' ), -- Default1$
('Julian', 'Rodhengberg', 'alumno', 4, '/img/pp18.png', '', 'bugha', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Santiago', 'Cvetkovic', 'alumno', 4, '/img/pp13.png', '', 'tayson', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Cecilia', 'Andrada', 'alumno', 4, '/img/pp13.png', '', 'setty', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Zoe', 'Ibarra', 'alumno', 4, '/img/pp17.png', '', 'zibarra', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Delfina', 'Carreras', 'alumno', 4, '/img/pp13.png', '', 'delcarry', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Tomas', 'Aguirre', 'alumno', 4, '/img/pp16.png', '', 'aguirreto', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'), -- Default1$
('Alma', 'Dominguez', 'alumno', 4, '/img/pp11.png', '', 'almadominguez', '$2b$12$zpZKQP3bfI1RLXDMleE0E.UNu1W2H/T1s9bmCBQ3AvFOjH5UUvGDa'); -- Default1$

-- Ingenieria en granjas
INSERT INTO materias (profesor, nombre, carga_horaria, carrera, foto, descripcion)
VALUES
(2 , 'Analisis Geoestructural de Chunk', 8, 2, 'https://i.imgur.com/Bz6g8eP.png', 'Estudio profundo de la topologia de chunks para optimizar mineria, generacion y estructuras subterraneas.'),
(3 , 'Gestion de Picos y Encantamientos', 8, 2, 'https://i.imgur.com/m0qbCug.png', 'Administracion eficiente de herramientas, encantamientos y durabilidad bajo condiciones de farmeo intensivo.'),
(5 , 'Automatizacion de Granjas de Mobs', 8, 2, 'https://i.imgur.com/ekGvQwq.png', 'Diseño y optimizacion de sistemas automaticos para drops y experiencia. Aplicaciones en redstone y pathfinding de mobs.'),
(4 , 'Teoria del Encantamiento Probabilistico', 8, 2, 'https://i.imgur.com/7okdgcR.png', 'Modelado estadistico de resultados de encantamientos en mesa y yunque. RNG, nivel requerido y eficiencia esperada.');

-- Licenciatura en Glitcheo etico y Uso Creativo de Bugs 
INSERT INTO materias (profesor, nombre, carga_horaria, carrera, foto, descripcion)
VALUES
(1 , 'Exploits Historicos y su Analisis', 8, 4, 'https://i.imgur.com/GXn1Y5s.png', 'Exploits Historicos y su Analisis Revision de glitches iconicos y su impacto en la jugabilidad, desde duplicacion de items hasta clipping dimensional.'),
(6 , 'Gestion de Tiempos de Respawn', 8, 4, 'https://i.imgur.com/vDFEB0w.png', 'Sincronizacion de eventos, mobs o items con cronometros internos del juego. Casos practicos y optimizacion.'),
(7 , 'Fisica del Body Block y Aggro Management', 8, 4, 'https://i.imgur.com/8RDzZI0.png', 'Manipulacion del movimiento de mobs y jugadores mediante colisiones. Uso ofensivo y defensivo de aggro controlado.');

-- Tecnicatura Universitaria en Tacticas de Rush
INSERT INTO materias (profesor, nombre, carga_horaria, carrera, foto, descripcion)
VALUES
(8 , 'Balistica Aplicada y Control de Recoil I', 8, 1, 'https://i.imgur.com/xcuupb5.jpeg', 'Estudio de patrones de retroceso, spread y penetracion. Teoria y practica con AK-47, M4A1 y SMGs.'),
(9 , 'Tacticas Psicologicas y Lectura de Rondas', 8, 1, 'https://i.imgur.com/PtdbEXH.png', 'Lectura del rival, conditioning y toma de decisiones basada en economia, timings y patrones mentales.'),
(10 , 'Geometria Tactica y Peekeo Angular', 8, 1, 'https://i.imgur.com/RkcHfSC.jpeg', 'Analisis de angulos favorables, shoulder peeks, preaims y uso del entorno para duelos efectivos.'),
(11 , 'Economia y Gestion de Recursos en Partidas Competitivas', 8, 1, 'https://i.imgur.com/yRjquik.png', 'Evaluacion de buys, ecos y utilidad. Control de economia de equipo para maximizar chances de victoria.'),
(12 , 'Historia Belica de Inferno: Banana como Territorio Disputado', 8, 1, 'https://i.imgur.com/7DUWOlM.jpeg', 'Estudio historico-estrategico del mapa Inferno. Dominio de Banana y su impacto en el control de rondas.'),
(13 , 'Introduccion a Setups Defensivos y Crossfires', 8, 1, 'https://i.imgur.com/OEbtx0w.png', 'Coordinacion de defensas dobles, posicionamiento y sincronizacion de tiros cruzados en sitios criticos.');

-- Tecnicatura Proplayer de Mundo Abierto y Estrategias Criminales
INSERT INTO materias (profesor, nombre, carga_horaria, carrera, foto, descripcion)
VALUES
(14 , 'Fundamentos de Heists y Planificacion Multietapa', 8, 3, 'https://i.imgur.com/wFtKohQ.png', 'Diseño de misiones coordinadas con multiples roles. Fases de preparacion, ejecucion y escape.'),
(15 , 'Conduccion Tactica y Evitacion de Persecucion Policial', 8, 3, 'https://i.imgur.com/iEfq9Kh.png', 'Estrategias evasivas ante 4 y 5 estrellas. Rutas secundarias, tuneles y distraccion de NPCs.'),
(16 , 'Economia Ilegal y Lavado de Dinero', 8, 3, 'https://i.imgur.com/edoQUfJ.jpeg', 'Gestion de ingresos sucios y reconversion mediante negocios fachada y activos inmobiliarios.'),
(17 , 'Hacking Aplicado al Crimen I', 8, 3, 'https://i.imgur.com/3p5e7bz.jpeg', 'Tecnicas avanzadas de intrusion en sistemas: circuitos, camaras, cajas fuertes y vigilancia.'),
(18 , 'Pilotaje Aereo Avanzado: Drones, Helicopteros y Fugas', 8, 3, 'https://i.imgur.com/XHxTeld.png', 'Control de aeronaves para reconocimiento, ataques coordinados y escapatorias imposibles.');
