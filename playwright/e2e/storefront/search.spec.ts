import { test, expect } from '../../support'
import { parseDate } from '../../support/helpers'
import { Mission, Reservation, Ticket, LunarBase } from '../../support/types'
import { cleanAndInsertMission, insertReservation, insertTicket, cleanAndInsertLunarBase } from '../../support/db'

test('deve buscar missões para todas as bases lunares disponíveis', async ({ app }) => {
  await app.store.homePage.go()
  await app.store.homePage.search()

  await expect(app.store.missionsPage.cardByBase('Base Lunar Alpha').first()).toBeVisible()
  await expect(app.store.missionsPage.cardByBase('Base Lunar Orion').first()).toBeVisible()
  await expect(app.store.missionsPage.cardByBase('Base Lunar Aurora').first()).toBeVisible()
  await expect(app.store.missionsPage.cardByBase('Base Lunar Selene').first()).toBeVisible()

  const dateTexts = await app.store.missionsPage.departureDates.allInnerTexts()
  const timestamps = dateTexts.map(text => parseDate(text).getTime())
  const sortedTimestamps = [...timestamps].sort((a, b) => a - b)

  expect(timestamps).toEqual(sortedTimestamps)
})

test('deve buscar missões filtrando por uma base específica', async ({ app }) => {
  await app.store.homePage.go()
  await app.store.homePage.selectBase('Base Lunar Alpha')
  await app.store.homePage.search()

  await expect(app.store.missionsPage.cardByBase('Base Lunar Alpha').first()).toBeVisible()
  await expect(app.store.missionsPage.cardByBase('Base Lunar Orion')).not.toBeVisible()
  await expect(app.store.missionsPage.cardByBase('Base Lunar Aurora')).not.toBeVisible()
  await expect(app.store.missionsPage.cardByBase('Base Lunar Selene')).not.toBeVisible()

  await expect(app.store.missionsPage.resultsCount).toContainText('missão disponível')
  await expect(app.store.missionsPage.baseFilterButton).toContainText('Base Lunar Alpha')
})

test('deve exibir missão esgotada nos resultados sem opção de reserva', async ({ app }) => {
  const mission: Mission = {
    id: 'LP-S001B',
    rocket: 'Starship',
    baseId: 'selene',
    departureDate: '2029-03-10',
    returnDate: '2029-03-17',
    price: 1000.00,
  }

  const reservation: Reservation = {
    id: 'e3a1f290-0001-4000-8000-000000000001',
    userId: null,
    missionId: mission.id,
    reservationCode: 'SOLD01',
    contactEmail: 'test@lunarpass.dev',
    totalPrice: '4000.00',
    status: 'confirmed',
    createdAt: '2026-11-17T14:00:00.000Z',
  }

  const tickets: Ticket[] = [
    { id: 'e3a1f290-0001-4001-8000-000000000001', reservationId: reservation.id, missionId: mission.id, seat: 'A1', fullName: 'Passageiro A1', document: 'PA00001' },
    { id: 'e3a1f290-0001-4001-8000-000000000002', reservationId: reservation.id, missionId: mission.id, seat: 'A2', fullName: 'Passageiro A2', document: 'PA00002' },
    { id: 'e3a1f290-0001-4001-8000-000000000003', reservationId: reservation.id, missionId: mission.id, seat: 'B1', fullName: 'Passageiro B1', document: 'PB00001' },
    { id: 'e3a1f290-0001-4001-8000-000000000004', reservationId: reservation.id, missionId: mission.id, seat: 'B2', fullName: 'Passageiro B2', document: 'PB00002' },
  ]

  await cleanAndInsertMission(mission)
  await insertReservation(reservation)
  for (const ticket of tickets) {
    await insertTicket(ticket)
  }

  await app.store.homePage.go()
  await app.store.homePage.selectBase('Base Lunar Selene')
  await app.store.homePage.search()

  await expect(app.store.missionsPage.soldOutBadgeByMission(mission.id)).toBeVisible()
  await expect(app.store.missionsPage.reserveLinkByMission(mission.id)).not.toBeVisible()
})

test('deve lidar com ausência de missões para os filtros', async ({ app }) => {
  const base: LunarBase = {
    id: 'titan',
    name: 'Base Lunar Titan',
    shortName: 'Titan',
    tagline: 'Mar de Metano Lunar',
    description: 'Estação de testes e exploração.',
    imageUrl: '/images/bases/alpha.jpg',
    sortOrder: 50,
    isActive: true,
    createdAt: new Date().toISOString(),
  }

  await cleanAndInsertLunarBase(base)

  await app.store.homePage.go()
  await app.store.homePage.selectBase('Base Lunar Titan')
  await app.store.homePage.search()

  await expect(app.store.missionsPage.emptyState).toBeVisible()
  await expect(app.store.missionsPage.emptyState).toContainText('Nenhuma missão programada com esses filtros.')
  await expect(app.store.missionsPage.clearSearchLink).toBeVisible()
  await expect(app.store.missionsPage.clearSearchLink).toHaveAttribute('href', '/missions')
})

