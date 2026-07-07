// load-test.js
// Prueba de carga sobre Airport Gap
// 10 usuarios usando la API al mismo tiempo durante 30 segundos

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,          // 10 usuarios simultáneos
  duration: '30s',  // durante 30 segundos
};

export default function () {

  // Petición 1 — listar aeropuertos
  const res1 = http.get('https://airportgap.com/api/airports');
console.log(`Código: ${res1.status}`);
  check(res1, {
    'status 200':       (r) => r.status === 200,
    'menos de 1000ms':  (r) => r.timings.duration < 1000,
  });

  // Petición 2 — buscar JFK
  const res2 = http.get('https://airportgap.com/api/airports/JFK');

  check(res2, {
    'JFK status 200':   (r) => r.status === 200,
  });

  sleep(1); // esperar 1 segundo antes de repetir
}