const clasesGestionUsuarios = require('../routes/gestionUsuarios/clasesGestionUsuarios/index');

test(`['administrador', 'instructor', 'aprendiz'], 'instructor'`, () => {
  expect(clasesGestionUsuarios.darPermisosAlUsuario(['administrador', 'instructor', 'aprendiz'], 'instructor')).toBe(true);
});
test(`['administrador', 'instructor', 'aprendiz']`, () => {
  expect(clasesGestionUsuarios.darPermisosAlUsuario(['administrador', 'instructor', 'aprendiz'], 'aprendiz')).toBe(true);
});
test(`['administrador', 'instructor', 'aprendiz'], 'administrador'))`, () => {
  expect(clasesGestionUsuarios.darPermisosAlUsuario(['administrador', 'instructor', 'aprendiz'], 'administrador')).toBe(true);
});
test(`['administrador', 'instructor'], 'administrador'`, () => {
  expect(clasesGestionUsuarios.darPermisosAlUsuario(['administrador', 'instructor'], 'administrador')).toBe(true);
});
test(`(['administrador', 'instructor'], 'instructor'`, () => {
  expect(clasesGestionUsuarios.darPermisosAlUsuario(['administrador', 'instructor'], 'instructor')).toBe(true);
});
test(`['administrador', 'instructor'], 'aprendiz'`, () => {
  expect(clasesGestionUsuarios.darPermisosAlUsuario(['administrador', 'instructor'], 'aprendiz')).toBe(false);
});
test(`07['administrador', 'aprendiz'], 'adimistrador'`, () => {
  expect(clasesGestionUsuarios.darPermisosAlUsuario(['administrador', 'aprendiz'], 'administrador')).toBe(true);
});
test(`['administrador', 'aprendiz'], 'aprendiz'`, () => {
  expect(clasesGestionUsuarios.darPermisosAlUsuario(['administrador', 'aprendiz'], 'aprendiz')).toBe(true);
});
test(`['administrador'], 'administrador'`, () => {
  expect(clasesGestionUsuarios.darPermisosAlUsuario(['administrador'], 'administrador')).toBe(true);
});
test(`['administrador'], 'aprendiz'`, () => {
  expect(clasesGestionUsuarios.darPermisosAlUsuario(['administrador'], 'aprendiz')).toBe(false);
});
test(`['administrador'], 'instructor'`, () => {
  expect(clasesGestionUsuarios.darPermisosAlUsuario(['administrador'], 'instructor')).toBe(false);
});
test(`['instructor', 'aprendiz'], 'instructor'`, () => {
  expect(clasesGestionUsuarios.darPermisosAlUsuario(['instructor', 'aprendiz'], 'instructor')).toBe(true);
});
test(`['instructor', 'aprendiz'], 'aprendiz'`, () => {
  expect(clasesGestionUsuarios.darPermisosAlUsuario(['instructor', 'aprendiz'], 'aprendiz')).toBe(true);
});

test(`['instructor', 'aprendiz'], 'administrador'`, () => {
  expect(clasesGestionUsuarios.darPermisosAlUsuario(['instructor', 'aprendiz'], 'administrador')).toBe(false);
});
test(`['instructor'], 'administrador'`, () => {
  expect(clasesGestionUsuarios.darPermisosAlUsuario(['instructor'], 'administrador')).toBe(false);
});
test(`['instructor'], 'aprendiz'`, () => {
  expect(clasesGestionUsuarios.darPermisosAlUsuario(['instructor'], 'aprendiz')).toBe(false);
});
test(`'instructor'], 'instructor'`, () => {
  expect(clasesGestionUsuarios.darPermisosAlUsuario(['instructor'], 'instructor')).toBe(true);
});
test(`['aprendiz'], 'administrador'`, () => {
  expect(clasesGestionUsuarios.darPermisosAlUsuario(['aprendiz'], 'administrador')).toBe(false);
});
test(`['aprendiz'], 'instructor'`, () => {
  expect(clasesGestionUsuarios.darPermisosAlUsuario(['aprendiz'], 'instructor')).toBe(false);
});
test(`['aprendiz'], 'aprendiz'`, () => {
  expect(clasesGestionUsuarios.darPermisosAlUsuario(['aprendiz'], 'aprendiz')).toBe(true);
});
              // test(`['administrador','instructor'],'instructor')`, () => {
//   expect(clasesGestionUsuarios.darPermisosAlUsuario(['administrador','instructor'],'aprendiz')).toBe(false);
// });

// test(`['administrador','instructor'],'instructor')`, () => {
//   expect(clasesGestionUsuarios.darPermisosAlUsuario(['administrador','instructor'],'administrador')).toBe(true);
// });
// test(`['administrador','instructor'],'instructor')`, () => {
//   expect(clasesGestionUsuarios.darPermisosAlUsuario(['aprendiz'],'aprendiz')).toBe(true);
// });

// test(`['administrador','instructor'],'instructor')`, () => {

//   expect(clasesGestionUsuarios.darPermisosAlUsuario(['administrador'],'administrador')).toBe(true);
// });

// test(`['administrador','instructor'],'instructor')`, () => {

//   expect(clasesGestionUsuarios.darPermisosAlUsuario(['instructor'],'administrador')).toBe(false);
// });
// test(`['administrador','instructor'],'instructor')`, () => {

//   expect(clasesGestionUsuarios.darPermisosAlUsuario([''],'administrador')).toBe(false);
// });
