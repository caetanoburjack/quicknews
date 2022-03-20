import { render } from '@testing-library/react'
import { Header } from '.'

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})

jest.mock('next-auth/client', () => {
    return {
        useSession() {
            return [null, false]
        }
    }
})

describe('Header Component', () => {

    // test('active link renders correctly', () => {// PODE SER USADO ASSIM, COM test()
    it('renders correctly', () => {// E PODE SER USADO ASSIM, COM it(), E FICA MAIS SEMÂNTICO
        const { getByText } = render(
            <Header />
        )

        expect(getByText('Home')).toBeInTheDocument()
        expect(getByText('Posts')).toBeInTheDocument()
    })
})
