# Programa de Fidelidad — Formulario de Inscripción

Ejercicio de valoración técnica: backend (Spring Boot) + frontend (React + Vite) para que los
clientes se registren en el programa de fidelidad de las marcas del grupo
(Americanino, American Eagle, Chevignon, Esprit, Naf Naf y Rifle).

## Estructura

```
PruebaFidelidad/
├─ backend/    Spring Boot 4, Java 17, Maven wrapper
└─ frontend/   React 19 + Vite 8, Axios, React Router
```

## Cómo levantar

### 1) Backend (puerto 8080)

```bash
cd backend
./mvnw spring-boot:run        # Windows: mvnw.cmd spring-boot:run
```

- Por defecto usa **H2 en memoria** (no requiere instalar nada), con datos semilla.
- Swagger: http://localhost:8080/swagger-ui.html
- Consola H2: http://localhost:8080/h2-console (JDBC URL: `jdbc:h2:mem:fidelidad`, usuario `sa`)

### 2) Frontend (puerto 5173)

```bash
cd frontend
npm install
npm run dev
```

Abrir http://localhost:5173

## Base de datos MySQL

La app funciona por defecto con H2. Para MySQL:

1. Ejecutar una vez el setup (crea la BD y el usuario):
   ```bash
   mysql -u root -p < backend/src/main/resources/db/setup-mysql.sql
   ```
2. Levantar con el perfil mysql:
   ```bash
   cd backend
   ./mvnw spring-boot:run -Dspring-boot.run.profiles=mysql
   ```
   (Las credenciales se sobreescriben con las variables `DB_USERNAME` y `DB_PASSWORD`.)

### Diseño de la base de datos

Normalizado en catálogos + tabla transaccional:

```
paises              (id, nombre)
departamentos       (id, nombre, pais_id → paises)
ciudades            (id, nombre, departamento_id → departamentos)
tipos_identificacion(id, codigo, nombre)      -- CC, CE, NIT, PASAPORTE, TI
marcas              (id, nombre)              -- las 6 marcas
clientes_fidelidad  (id, tipo_identificacion_id, numero_identificacion,
                     nombres, apellidos, fecha_nacimiento, direccion,
                     ciudad_id, departamento_id, pais_id, marca_id,
                     fecha_registro)
usuarios            (id, email, password_hash)  -- login simple opcional
```

- Restricción única `(tipo_identificacion_id, numero_identificacion, marca_id)`: impide inscribir
  dos veces a la misma persona en la misma marca.
- Los scripts están en `backend/src/main/resources/db/` (`mysql-schema.sql`, `mysql-data.sql`).

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/catalogos/paises` | Países (desplegable) |
| GET | `/api/catalogos/paises/{paisId}/departamentos` | Departamentos por país |
| GET | `/api/catalogos/departamentos/{deptId}/ciudades` | Ciudades por departamento |
| GET | `/api/catalogos/tipos-identificacion` | Tipos de identificación |
| GET | `/api/catalogos/marcas` | Marcas del grupo |
| POST | `/api/clientes-fidelidad` | Registrar inscripción |
| POST | `/api/clientes-fidelidad/verificar` | Verificar si ya está inscrito |
| GET | `/api/clientes-fidelidad` | Listar inscritos |
| GET | `/api/clientes-fidelidad/{id}` | Detalle de un inscrito |
| POST | `/api/auth/registro` | Crear usuario (login opcional) |
| POST | `/api/auth/login` | Iniciar sesión (login opcional) |

## Reglas de negocio implementadas

- Mayor de 18 años (validada en frontend y backend).
- Formato de identificación según el tipo (CC/TI numérica 6-10, NIT 9-12, pasaporte alfanumérico).
- Coherencia de la cascada país → departamento → ciudad (el departamento debe pertenecer al país,
  la ciudad al departamento).
- No duplicados: misma identificación en la misma marca rechazada con 409.
- El formulario es **público**: no requiere inicio de sesión (el login está disponible de forma opcional).

## Despliegue

### Frontend en Vercel (React + Vite)

Opción A — Dashboard:
1. Subir el repositorio a GitHub.
2. En Vercel: **New Project** → importar el repo → framework **Vite**.
3. Variables de entorno: `VITE_API_URL=https://TU-BACKEND.onrender.com/api`.
4. Build: `npm run build` / Output: `dist` (ya incluye `vercel.json` para SPA).

Opción B — CLI:
```bash
npm i -g vercel
cd frontend
vercel          # inicia sesión y hace login una vez
vercel --prod   # publica
```

### Backend en Render (Spring Boot)

Vercel no ejecuta Spring Boot; el backend se publica aparte (Render u otro host):

1. Subir el repositorio a GitHub.
2. En render.com: **New Web Service** → conectar el repo → carpeta `backend`.
3. Build: `chmod +x mvnw && ./mvnw -DskipTests package` | Start: `java -jar target/PruebaFidelidadBack-0.0.1-SNAPSHOT.jar`.
4. Variable de entorno: `APP_CORS_ALLOWED_ORIGINS=https://TU-FRONT.vercel.app` (con comas si hay varios).
5. Opcional (persistencia): provisionar MySQL (Railway/Aiven) y correr con el perfil `mysql`
   (`--spring.profiles.active=mysql`) más `DB_USERNAME` y `DB_PASSWORD`.

> Sin MySQL, Render corre el perfil por defecto (H2 en memoria): la demo funciona pero los datos
> se reinician al reiniciar el servicio.