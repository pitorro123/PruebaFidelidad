# Prueba Fidelidad

Demo de un programa de fidelidad "SUMAS": registro de clientes, acumulacion/canje de puntos, campanas, cupones y compras que suman puntos.

## Requisitos
- **Java 17+**
- **Node 18+** y **npm**
- **Maven** (o el wrapper `./mvnw` que ya trae el proyecto)

## Pasos para ejecutar

### 1. Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

- Corre en `http://localhost:8080`
- Usa una base **H2 en memoria** (se llena sola con datos de prueba al arrancar)
- Consola de base de datos: `http://localhost:8080/h2-console` (`jdbc:h2:mem:fidelidad`, usuario `sa`)
- Documentacion API: `http://localhost:8080/swagger-ui.html`

### 2. Frontend (React/Vite)

Abre otra terminal:

```bash
cd frontend
npm install
npm run dev
```

- Se abre en `http://localhost:5173`
- El frontend ya tiene proxy hacia el backend en el puerto 8080 (no hay que configurar nada)

## Datos de prueba

Al iniciar el backend se crea un cliente y una campaña:

- **Socio SUMAS:** Ana Sofia Gomez, documento CC `1000000001`, saldo 15.000
- **Campaña activa:** "Sumas Days" (40% de descuento)
- La inscripcion a fidelidad genera un cupon de cumpleaños automaticamente

## Funcionalidades que puedes probar

- Registro en club de fidelidad (boton de la landing) y consulta de cupones
- Consultar/acumular/canjear puntos desde "Mis puntos SUMAS" en el header
- Comprar un producto desde su pagina: pide iniciar sesion y suma puntos si estas inscrito
- Correos de bienvenida (HTML reales) — ver seccion [Correo de bienvenida (SMTP de Gmail)](#correo-de-bienvenida-smtp-de-gmail)

## Correo de bienvenida (SMTP de Gmail)

La app envia correos HTML reales por Gmail SMTP:

- Al **crear cuenta** se envia un correo de bienvenida ("Bienvenido a ReVuelta").
- Al **inscribirse en el programa de fidelidad** se envia el correo con el **bono de 20%** (e incluye el bono de cumpleaños).

Para que los participantes del demo reciban los correos en su bandeja:

1. Crea el archivo `backend/.env` (esta ignorado en git) con:

   ```bash
   MAIL_USERNAME=tu.correo.remitente@gmail.com
   MAIL_PASSWORD=xxxxxxxxxxxxxxxxxxxx
   ```

2. `MAIL_PASSWORD` es la **contraseña de aplicacion** de Google: en tu cuenta de Google ve a *Seguridad > Verificación en 2 pasos > Contraseñas de aplicaciones* y genera una para la app "Correo".
3. El envio usa `smtp.gmail.com:587` con STARTTLS (ya configurado en `application.properties`).
4. En la pantalla **Crear cuenta** el formulario pide un **correo real** y rechaza dominios falsos (`@test.com`, `@ejemplo.com`, `@mailinator.com`, etc.) para que el participante reciba alli su bono de bienvenida.
5. Reinicia el backend con `./mvnw spring-boot:run`. En la consola deberia verse `Correo de bienvenida enviado a ...` por cada correo enviado (o un `log.warn` si falla).

> **Nota:** si `MAIL_USERNAME`/`MAIL_PASSWORD` estan vacios, el registro funciona igual pero no se envian correos.

## Estructura simplificada

```
backend/    API REST (Spring Boot, H2, JPA)
frontend/   App React (Vite) + estilos CSS modules
```

## Base de datos MySQL (opcional)

El proyecto viene con un esquema listo en `backend/src/main/resources/db/mysql-schema.sql` y un perfil opcional `application-mysql.properties` por si quieres usar MySQL en vez de H2.