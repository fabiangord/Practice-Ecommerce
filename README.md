Este es un Ecommerce en proceso implementando NODE, EXPRESS, MYSQL, TYPESCRIPT

Para ejecutar este proyecto primero asegurese de tener instalado DOCKER, ya teniendo instalado DOCKER, nos ubicamos en la carpeta del proyecto:
  1. Se ejecuta comando 'docker-compose up --build -d' para ejecutar la base de datos montada en MYSQL
  2. Ya teniendo la base de datos activa, se ejecuta el comando 'npx prisma migrate dev' para realizar la migracion del modelo correspondiente
  3. Por ultimo, se ejecuta el comando npm run start:dev para iniciar el servidor del proyecto, debe mostrar un mensaje 'listening on 3600'.
