import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/client'
import { SubscribeButton } from '.'

jest.mock('next-auth/client', () => {
    return {
        useSession() {
            return [null, false]
        }
    }
})

describe('SubscribeButton Component', () => {

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

    })
})
