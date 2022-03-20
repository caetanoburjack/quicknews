import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/client'
import { SignInButton } from '.'

jest.mock('next-auth/client')

describe('SignInButton Component', () => {

    // test('active link renders correctly', () => {// PODE SER USADO ASSIM, COM test()
    it('renders correctly when user is not logged in', () => {// E PODE SER USADO ASSIM, COM it(), E FICA MAIS SEMÂNTICO
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([null, false])//null É PARA SESSÃO E false PARA O LOADING 

        // const {debug} = render( //IMPORTANDO O debug PARA MOSTRAR NO CONSOLE A SAIDA DO RENDER
        render(
            <SignInButton />
        )

        // debug()// CHAMANDO O DEBUG PARA MOSTRAR NO CONSOLE A SAIDA DO RENDER
        expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument()
    })

    it('renders correctly when user is logged in', () => {// E PODE SER USADO ASSIM, COM it(), E FICA MAIS SEMÂNTICO
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([
            {
                user: {
                    name: 'Caetano Burjack',
                    email: 'caetano.burjack@gmail.com'
                },
                expires: 'fake-expires'
            },
            false])

        render(
            <SignInButton />
        )
        expect(screen.getByText('Caetano Burjack')).toBeInTheDocument()
    })
})
