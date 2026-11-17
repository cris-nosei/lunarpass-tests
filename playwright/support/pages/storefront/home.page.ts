import { Page, Locator } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly slogan: Locator
  readonly searchButton: Locator

  constructor(page: Page) {
    this.page = page
    this.slogan = page.getByRole('heading', { name: 'Sua viagem para a Lua começa aqui.' })
    this.searchButton = page.getByRole('button', { name: 'Buscar missões' })
  }

  async go() {
    await this.page.goto('/')
  }

  baseCheckbox(baseName: string) {
    return this.page.getByRole('checkbox', { name: baseName })
  }

  async selectBase(baseName: string) {
    await this.baseCheckbox(baseName).check()
  }

  async search() {
    await this.searchButton.click()
    await this.page.waitForURL(/\/missions/)
  }
}
