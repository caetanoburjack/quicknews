import { render, screen, fireEvent } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { SubscribeButton } from '.'

jest.mock('next-auth/client')

jest.mock('next/router')

describe('SubscribeButton Component', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])
    // test('active link renders correctly', () => {// PODE SER USADO ASSIM, COM test()
    it('renders correctly when user is not logged in', () => {// E PODE SER USADO ASSIM, COM it(), E FICA MAIS SEMÂNTICO
        // const {debug} = render( //IMPORTANDO O debug PARA MOSTRAR NO CONSOLE A SAIDA DO RENDER
        render(
            <SubscribeButton />
        )

        // debug()// CHAMANDO O DEBUG PARA MOSTRAR NO CONSOLE A SAIDA DO RENDER
        expect(screen.getByText('Subscribe Now')).toBeInTheDocument()
    })

    it('redirects user to SignIn when not logged in', () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([null, false])

        const signInMocked = mocked(signIn)

        render(<SubscribeButton />)

        const subscribeButton = screen.getByText('Subscribe Now')

        fireEvent.click(subscribeButton)

        expect(signInMocked).toHaveBeenCalled()
    })

    it('redirects to posts when the user already has a subscription', () => {
        const useRouterMocked = mocked(useRouter)

        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([
            {
                user: {
                    name: 'Caetano Burjack',
                    email: 'caetano.burjack@gmail.com'
                },
                activeSubscription: 'fake-active-subscription',
                expires: 'fake-expires'
            },
            false
        ])

        const pushMock = jest.fn()

        useRouterMocked.mockReturnValueOnce(
            {
                push: pushMock
            } as any
        )

        render(<SubscribeButton />)

        const subscribeButton = screen.getByText('Subscribe Now')

        fireEvent.click(subscribeButton)

        expect(pushMock).toHaveBeenCalled()

    })
})
