import { Page, Locator } from '@playwright/test'

export class MissionsPage {
  readonly page: Page
  readonly missionCards: Locator
  readonly departureDates: Locator
  readonly resultsCount: Locator
  readonly baseFilterButton: Locator
  readonly emptyState: Locator
  readonly clearSearchLink: Locator

  constructor(page: Page) {
    this.page = page
    this.missionCards = page.getByTestId('mission-card')
    this.departureDates = page.getByTestId('departure-date')
    this.resultsCount = page.getByRole('heading', { level: 1 })
    this.baseFilterButton = page.getByRole('button', { name: 'Bases lunares' })
    this.emptyState = page.getByTestId('missions-empty-state')
    this.clearSearchLink = this.emptyState.getByRole('link', { name: 'Ver todas as janelas' })
  }

  async go() {
    await this.page.goto('/missions')
  }

  cardByBase(baseName: string) {
    return this.missionCards.filter({ has: this.page.getByRole('heading', { name: baseName }) })
  }

  soldOutBadgeByMission(missionId: string) {
    return this.page.locator(`[data-mission-code="${missionId}"]`).getByTestId('mission-sold-out')
  }

  reserveLinkByMission(missionId: string) {
    return this.page.locator(`[data-mission-code="${missionId}"]`).getByRole('link', { name: 'Reservar' })
  }
}
