# PANIC AT THE API

*Servicio de información de sesión por parte de clientes*

Permitirá a los clientes aportar información sobre una sesión de entrenamiento realizada, aportando información de salud tales como pulsaciones del corazón, peso, calorías consumidas estimadas y tiempo de ejercicio (al menos). Además, permitirá hacer comentarios al entrenador, mandarle vídeo (enlace a plataformas como Youtube o Vimeo) y foto del entrenamiento.

### Funcionamiento

Nuestra aplicación web permitirá al usuario añadir, eliminar o editar sesiones que haya realizado en el gimnasio.

Estas sesiones pertenecerán a un plan, por lo que será necesario que al añadir una nueva sesión primero se seleccione un plan.

A continuación se introduce toda la información relacionada a esta sesión, incluidos posibles enlaces a video y fotografía.

Incluye intregación completamente funcional de la aplicación de login y gestión de usuario que se nos ha proporcionado en el campus virtual.

### Importante!

Nuestra aplicación cuenta con un backend falso que permite hacer pruebas de funcionamiento de manera más ágil. Aunque las conexiones con un backend real están implementadas, con métodos que permiten hacer todas las peticiones necesarias simplemente cambiando un par de líneas de código. (Toda la implementación de las llamadas está incluido en frontend/src/openapi/lifefitAPI/ incluyendo métodos para las peticiones y entidades para todos los tipos de datos)