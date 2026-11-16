import { test, expect } from '../../support'

test.beforeEach(async ({ app }) => {
  await app.mission.loginPage.go()
})

test('deve autenticar no controle de missões', async ({ app }) => {
  await app.mission.loginPage.login('buzz@lunarpass.dev', 'pwd123')
  await expect(app.mission.navbar.logout).toBeVisible({ timeout: 10_000 })
})

test('não deve autenticar com senha incorreta', async ({ app }) => {
  await app.mission.loginPage.login('buzz@lunarpass.dev', 'abc123')
  await expect(app.mission.loginPage.alert).toHaveText('E-mail ou senha inválidos.')
})

test('não deve autenticar com email não cadastrado', async ({ app }) => {
  await app.mission.loginPage.login('404@lunarpass.dev', 'abc123')
  await expect(app.mission.loginPage.alert).toHaveText('E-mail ou senha inválidos.')
})

test('não deve autenticar quando a senha não é informada', async ({ app }) => {
  await app.mission.loginPage.login('buzz@lunarpass.dev', '')
  await expect(app.mission.loginPage.alert).toHaveText('Informe a senha')
})

test('não deve autenticar quando o email não é informado', async ({ app }) => {
  await app.mission.loginPage.login('', 'pwd123')
  await expect(app.mission.loginPage.alert).toHaveText('Informe um e-mail válido')
})

test('não deve autenticar quando não informo email e senha', async ({ app }) => {
  await app.mission.loginPage.login('', '')
  await expect(app.mission.loginPage.alert).toHaveText('Informe um e-mail válido')
})
