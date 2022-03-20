import { render, screen } from '@testing-library/react'
import { ActiveLink } from '.'

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})

describe('ActiveLink Component', () => {

    // test('active link renders correctly', () => {// PODE SER USADO ASSIM, COM test()
    it('renders correctly', () => {// E PODE SER USADO ASSIM, COM it(), E FICA MAIS SEMÂNTICO
        render(
            <ActiveLink href='/' activeClassName='active'>
                <a>Home</a>
            </ActiveLink>
        )

        expect(screen.getByText('Home')).toBeInTheDocument()
    })


    it('adds active class if the link is currenctly active', () => {
        const { getByText } = render(
            <ActiveLink href='/' activeClassName='active'>
                <a>Home</a>
            </ActiveLink>
        )

        expect(getByText('Home')).toHaveClass('active')
    })
})
