
# 🎉 Fiesta Module

Este módulo permite la gestión de fiestas (eventos) en una base de datos MongoDB utilizando Mongoose. Incluye funciones para agregar, obtener y actualizar fiestas.

## 📦 Requisitos

* Node.js (>=14.x recomendado)
* MongoDB
* TypeScript
* Variables de entorno correctamente configuradas (por ejemplo, para la conexión a MongoDB)

## 🧹 Instalación

Asegurate de tener las siguientes dependencias instaladas:

```bash
npm install mongoose
```

Importá correctamente la función `connectDb` desde el archivo `./config/mongo`, que se espera maneje la conexión a MongoDB.

## 🌐 Variables de entorno

Este módulo parece esperar que se carguen variables de entorno. Asegurate de que esté presente una llamada válida a `process.loadEnvFile` (actualmente está mal usada y no tiene efecto).

Reemplazá:

```ts
process.loadEnvFile
```

Con algo como:

```ts


---

## 🧠 Interface

```ts
interface IFiesta {
  fecha: string;
  nombre: string;
  edad: number;
  horario: string;
  pago: string;
  telefono?: string;
}
```

Define la estructura de una fiesta. Todos los campos son obligatorios salvo `telefono`.

---

## 🧱 Esquema de Mongoose

```ts
const fiestaSchema = new Schema({...}, { versionKey: false });
```

### Campos:

* `fecha` *(string, requerido)*: Fecha del evento.
* `nombre` *(string, requerido)*: Nombre del niño o niña.
* `edad` *(number)*: Edad del cumpleañero/a.
* `horario` *(string, requerido)*: Horario del evento.
* `pago` *(string, requerido, default: "pendiente")*: Estado de pago.
* `telefono` *(string, opcional)*: Teléfono de contacto.

**Nota:**
Aunque se establece `versionKey: false`, si ves `__v` en tu documento, asegurate de que no haya otros lugares donde se esté sobreescribiendo el esquema o creando manualmente ese campo.

---

## 🛠 Funciones Exportadas

### `addNewFiesta(newFiesta: IFiesta): Promise<{ success: boolean, data?: any, error?: string, message?: string }> `

Agrega una nueva fiesta a la base de datos.

**Parámetros:**

* `newFiesta`: Objeto con los datos de la fiesta (debe cumplir con la interfaz `IFiesta`).

**Ejemplo:**

```ts
await addNewFiesta({
  fecha: "2025-08-15",
  nombre: "Lucas",
  edad: 7,
  horario: "16:00",
  pago: "pendiente",
  telefono: "123456789"
});
```

---

### `getFiestas(): Promise<{ success: boolean, data?: any[], error?: string, message?: string }>`

Devuelve todas las fiestas almacenadas en la base de datos.

---

### `getFiesta(id: string): Promise<{ success: boolean, data?: any, error?: string, message?: string }>`

Busca una fiesta por su ID de MongoDB.

---

### `updateFiesta(id: string, newData: Partial<IFiesta>): Promise<{ success: boolean, data?: any, error?: string, message?: string }>`

Actualiza una fiesta con nuevos datos.

**Parámetros:**

* `id`: ID de la fiesta a actualizar.
* `newData`: Objeto con los campos a modificar (puede ser parcial).

---

## 📝 Notas adicionales

* El modelo `fiesta` se registra en singular, pero Mongoose lo pluraliza automáticamente a `fiestas` al buscar la colección.
* Siempre validá que la conexión a la base de datos esté establecida antes de usar las funciones.
* Para evitar errores inesperados, sería útil agregar más validaciones y sanitización de datos.

---

## 🧪 Pendientes / Mejoras sugeridas

* Agregar validación más detallada para `telefono`, `edad`, etc.
* Integrar `Joi` o alguna librería de validación externa.
* Añadir función para eliminar fiestas.
* Corregir `process.loadEnvFile`, que actualmente no está haciendo nada.

---

## 📁 Estructura del archivo

```
fiesta.ts
├── interface IFiesta
├── Schema y modelo Mongoose
├── addNewFiesta()
├── getFiestas()
├── getFiesta()
└── updateFiesta()
```

---

## 👤 Autor

Desarrollado por \[Tu Nombre o Equipo].
