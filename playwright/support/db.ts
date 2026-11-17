import { Pool } from 'pg'
import { Kysely, PostgresDialect, CamelCasePlugin } from 'kysely'

import { Mission, Reservation, Ticket, LunarBase } from './types'

interface Database {
  missions: Mission
  reservations: Reservation
  tickets: Ticket
  lunarBases: LunarBase
}

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  }),
})

export const db = new Kysely<Database>({
  dialect,
  plugins: [new CamelCasePlugin()],
})

// ---- missions ----

export async function cleanMission(mission: Mission) {
  await deleteReservation(mission.id)
  await deleteTicket(mission.id)
  await deleteMission(mission.id)
}

export async function cleanAndInsertMission(mission: Mission) {
  await cleanMission(mission)
  await insertMission(mission)
}

export async function insertMission(mission: Mission) {
  await db
    .insertInto('missions')
    .values(mission)
    .execute()
}

export async function deleteMission(id: string) {
  await db
    .deleteFrom('missions')
    .where('id', '=', id)
    .execute()
}

// ---- reservations ----

export async function deleteReservation(missionId: string) {
  await db
    .deleteFrom('reservations')
    .where('missionId', '=', missionId)
    .execute()
}

export async function insertReservation(reservation: Reservation) {
  await db
    .insertInto('reservations')
    .values(reservation)
    .execute()
}

// ---- tickets ----

export async function deleteTicket(missionId: string) {
  await db
    .deleteFrom('tickets')
    .where('missionId', '=', missionId)
    .execute()
}

export async function insertTicket(ticket: Ticket) {
  await db
    .insertInto('tickets')
    .values(ticket)
    .execute()
}

// ---- lunar bases ----

export async function deleteLunarBase(id: string) {
  await db
    .deleteFrom('lunarBases')
    .where('id', '=', id)
    .execute()
}

export async function cleanLunarBase(base: LunarBase) {
  await deleteLunarBase(base.id)
}

export async function insertLunarBase(base: LunarBase) {
  await db
    .insertInto('lunarBases')
    .values(base)
    .execute()
}

export async function cleanAndInsertLunarBase(base: LunarBase) {
  await cleanLunarBase(base)
  await insertLunarBase(base)
}
