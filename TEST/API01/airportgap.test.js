// airportgap.test.js 
const request = require('supertest');
const API = 'https://airportgap.com';

describe('Airport Gap API', () => {

  test('R1: GET /api/airports → 200 + listar aeropuertos', async () => {
    const res = await request(API).get('/api/airports');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true); // res.body.data, no data.data
  });

  // R2 — estaba bien
  test('R2: GET /api/airports/JFK → 200 + datos de JFK', async () => {
    const res = await request(API).get('/api/airports/JFK');

    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe('JFK');
    expect(res.body.data.attributes.city).toBe('New York');
  });

  // R3 — estaba bien
  test('R3: GET /api/airports/ZZZ → 404 (no existe)', async () => {
    const res = await request(API).get('/api/airports/ZZZ');

    expect(res.status).toBe(404);
  });

   // R4 — CALCULAR DISTNACIA
   test('R4: CALCULA DISTANCIA: JFK a LIM → 200 + km mayor a 0', async () => {
 
    const res = await request(API).post('/api/airports/distance')
 
      // Body → x-www-form-urlencoded en Postman
      // En código: cadena de texto con & entre campos
      .send('from=JFK&to=LIM')
      .set('Content-Type', 'application/x-www-form-urlencoded');
 
    expect(res.status).toBe(200);
    expect(res.body.data.attributes.kilometers).toBeGreaterThan(0);
    expect(res.body.data.attributes.from_airport.iata).toBe('JFK');
    expect(res.body.data.attributes.to_airport.iata).toBe('LIM');
  });
 

  // R5 —  AGREGAR favorito 
  test('R5: agregar favorito UAK → 201', async () => {
    const res = await request(API)
      .post('/api/favorites')
      .send({ airport_id: 'UAK', note: 'Mi favorito liz2' })
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer token=Dcv7wta7Fq6iHRxf56zY6Cuw');

    console.log('STATUS que llegó:', res.status);
    console.log('BODY que llegó:', JSON.stringify(res.body, null, 2));

    expect(res.status).toBe(201);
    expect(res.body.data.attributes.airport.iata).toBe('UAK');
    expect(res.body.data.attributes.note).toBe('Mi favorito liz2');
  });

});