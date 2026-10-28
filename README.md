<div align="center">

# Hotel Miranda · Testing

**Lógica de reservas y ocupación de un hotel, escrita en JavaScript y cubierta con tests unitarios en Jest.**

Proyecto del bootcamp Full Stack de OXYGEN Academy · Sprint 4 (Testing)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Jest](https://img.shields.io/badge/Jest_29-C21325?style=flat-square&logo=jest&logoColor=white)
![Tests](https://img.shields.io/badge/tests-11_passing-2EA44F?style=flat-square)

</div>

---

## Qué es

Parte del proyecto *Hotel Miranda*. En este sprint el objetivo era practicar testing: modelar habitaciones y reservas con dos clases (`Room` y `Booking`) y comprobar con **Jest** que los cálculos de ocupación, disponibilidad y precio son correctos.

## Funcionalidades

Todo el código está en `index.js` y se exporta como módulo CommonJS.

**Clase `Room`** (`name`, `bookings`, `rate`, `discount`)

| Método | Qué hace |
| --- | --- |
| `isOccupied(date)` | Indica si la habitación tiene una reserva que cubra esa fecha. |
| `occupancyPercentage(start, end)` | Porcentaje de días ocupados de la habitación en un rango de fechas. |
| `Room.totalOccupancyPercentage(rooms, start, end)` | Ocupación media de un conjunto de habitaciones en ese rango. |
| `Room.availableRooms(rooms, start, end)` | Devuelve las habitaciones sin reservas que se solapen con el rango. |

**Clase `Booking`** (`name`, `email`, `checkIn`, `checkOut`, `discount`, `room`)

| Propiedad | Qué hace |
| --- | --- |
| `fee` (getter) | Precio total: noches × tarifa de la habitación, aplicando primero el descuento de la habitación y después el de la reserva. Se redondea al entero. |

Las tarifas se expresan en céntimos (por ejemplo, `10000` = 100 €) para evitar errores de coma flotante.

## Qué se testea

`index.test.js` contiene **11 tests** agrupados en dos `describe`:

- **Clase Room (9)**: creación de la instancia; habitación libre y ocupada en una fecha; ocupación del 0 %, del 100 % y parcial (≈40 %); ocupación total de varias habitaciones; habitaciones disponibles y no disponibles en un rango.
- **Clase Booking (2)**: creación de la instancia y cálculo de la tarifa con los dos descuentos encadenados.

```
Test Suites: 1 passed, 1 total
Tests:       11 passed, 11 total
```

## Stack

- JavaScript (ES6+, clases y getters) sobre Node.js
- Jest 29 como framework de testing

## Estructura

```
.
├── index.js         Clases Room y Booking
├── index.test.js    Suite de tests con Jest
└── package.json     Dependencia de Jest y script "jest"
```

## Puesta en marcha

Requisitos: Node.js 18 o superior.

```bash
git clone https://github.com/albertocalerocastillo/OXYGEN_HotelMiranda_Testing.git
cd OXYGEN_HotelMiranda_Testing
npm install
npm run jest
```

Para lanzar los tests en modo observación mientras se edita el código:

```bash
npx jest --watch
```

No necesita variables de entorno ni base de datos.

## Qué aprendí

- Escribir tests unitarios con Jest (`describe`, `test`, `expect`, `toBe`, `toEqual`, `toBeCloseTo`).
- Pensar en los casos límite antes que en el caso feliz: sin reservas, ocupación completa, solapes parciales.
- Trabajar con fechas en JavaScript y convertir milisegundos en días y noches.
- Usar enteros (céntimos) para cálculos de dinero y redondear solo al final.

---

<div align="center">

Hecho por **Alberto Calero** · [github.com/albertocalerocastillo](https://github.com/albertocalerocastillo)

</div>
