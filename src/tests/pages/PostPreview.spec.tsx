import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Post, { getStaticProps } from '../../pages/posts/preview/[slug]'
import { getPrismicClient } from '../../services/prismic'

const post = { //ESSE OBJETO POST É USADO PARA FAZER O PRIMEIRO TEST (RENDERS CORRECTLY)
    slug: 'my-new-post',
    title: 'My New Post',
    content: 'Post Content',
    updatedAt: '10 de Abril'
}

jest.mock('next-auth/client')
jest.mock('next/router')
jest.mock('../../services/prismic')

describe('Post Preview Page', () => {
    it('renders correctly', () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([null, false])

        render(<Post post={post} />)

        expect(screen.getByText("My New Post")).toBeInTheDocument()
        expect(screen.getByText("Post Content")).toBeInTheDocument()
        expect(screen.getByText("Continue Reading?")).toBeInTheDocument()
    })

    it('redirects user to full post when is logged in', async () => {
        const useSessionMocked = mocked(useSession)
        const useRouterMocked = mocked(useRouter)
        const pushMock = jest.fn()

        useSessionMocked.mockReturnValueOnce([
            { activeSubscription: 'fake-subscription' },
            false
        ] as any)

        useRouterMocked.mockReturnValueOnce({
            push: pushMock,
        } as any)

        render(<Post post={post} />)
        screen.logTestingPlaygroundURL()

        expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post')
    })

    it('loads initial data', async () => {
        const getPrismicClientMocked = mocked(getPrismicClient)
        getPrismicClientMocked.mockReturnValueOnce({
            getByUID: jest.fn().mockResolvedValueOnce({
                data: {
                    title: [{
                        type: 'heading', text: 'My New Post'
                    }],
                    content: [{
                        type: 'paragraph', text: 'Post Content'
                    }],
                },
                last_publication_date: '04-01-2021',
            })
        } as any)

        const response = await getStaticProps(
            {
                params: {
                    slug: 'my-new-post'
                }
            } as any
        )
        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    post: {
                        slug: 'my-new-post',
                        title: 'My New Post',
                        content: '<p>Post Content</p>',
                        updatedAt: '01 de abril de 2021'
                    }
                }
            })
        )

    })

})