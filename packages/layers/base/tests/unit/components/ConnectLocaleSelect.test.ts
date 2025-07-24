import { vi, describe, expect, it } from 'vitest'
import { mountSuspended, renderSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import { fireEvent, screen } from '@testing-library/vue'

import { i18nMock } from '../mocks/i18n'
import ConnectLocaleSelect from '../../../app/components/Connect/LocaleSelect.vue'

const setLocaleMock = vi.fn()

mockNuxtImport('useI18n', () => {
  return () => (
    {
      locale: 'en-CA',
      locales: ref([
        {
          name: 'English',
          code: 'en-CA',
          language: 'en-CA',
          dir: 'ltr',
          file: 'en-CA.ts'
        },
        {
          name: 'French',
          code: 'fr-CA',
          language: 'fr-CA',
          dir: 'ltr',
          file: 'fr-CA.ts'
        }
      ]),
      t: (key: string) => key,
      setLocale: setLocaleMock
    }
  )
})

describe('<ConnectLocaleSelect />', () => {
  it('mounts', async () => {
    const wrapper = await renderSuspended(ConnectLocaleSelect, {
      global: {
        plugins: [i18nMock]
      }
    })

    expect(wrapper).toBeTruthy()
  })

  it('can open the dropdown', async () => {
    const wrapper = await renderSuspended(ConnectLocaleSelect, {
      global: {
        plugins: [i18nMock]
      }
    })

    // menuitem hidden by default
    const menuitemStart = wrapper.queryByRole('menuitem')
    expect(menuitemStart).toEqual(null)

    // click buttton to open menu
    const button = screen.getByLabelText('Select a Language, current language: English')
    await fireEvent.click(button)

    // menutiem should now be in the dom
    const menuitemEnd = screen.getAllByRole('menuitem')
    expect(menuitemEnd).toBeTruthy()
  })

  it('can change the locale value', async () => {
    await renderSuspended(ConnectLocaleSelect, {
      global: {
        plugins: [i18nMock]
      }
    })

    // click buttton to open menu
    const button = screen.getByLabelText('Select a Language, current language: English')
    await fireEvent.click(button)

    // click 'english' in dropdown menu
    const buttonEn = screen.getAllByText('English')
    await fireEvent.click(buttonEn[0])

    // locale should be en-CA
    expect(setLocaleMock).toHaveBeenCalledOnce()
    expect(setLocaleMock).toHaveBeenCalledWith('en-CA')

    // click 'french' in dropdown menu
    // unsure why its rendering 2 'French' options in the vitest
    const buttonFr = screen.getAllByText('French')
    await fireEvent.click(buttonFr[0])

    // locale should now be fr-CA
    expect(setLocaleMock).toHaveBeenCalledTimes(2)
    expect(setLocaleMock).toHaveBeenCalledWith('fr-CA')
  })

  it('computed returns correct items for dropdown', async () => {
    const wrapper = await mountSuspended(ConnectLocaleSelect, {
      global: {
        plugins: [i18nMock]
      }
    })

    // @ts-ignore // cant find items in wrapper instance
    const computedItems = wrapper.vm.items

    const expectedItems = [
      [
        { label: 'English', icon: '', class: 'pl-8', color: 'neutral', onSelect: expect.any(Function) },
        { label: 'French', icon: '', class: 'pl-8', color: 'neutral', onSelect: expect.any(Function) }
      ]
    ]

    expect(computedItems).toEqual(expectedItems)
  })
})
