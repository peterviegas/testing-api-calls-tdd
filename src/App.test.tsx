import React from 'react';
import { render, screen, waitFor} from '@testing-library/react';
import App from './App';
import {setupServer} from 'msw/node';
import {rest} from 'msw';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/The Star Wars API/i);
  expect(linkElement).toBeInTheDocument();
});

const server = setupServer(
  // capture "GET /greeting" requests
  rest.get('https://swapi.dev/api/people/1', async (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json({
      name: "Luke Skywalker",
      height: '172'
    }))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Confirm character name', async () => {
  await render(<App />)
  const luke = await screen.findByText(/Luke Skywalker/)
  await expect(luke).toBeInTheDocument()

})

test('Confirms the characters height', async () => {
  await render(<App />)
  const luke = await screen.findByText(/172/)
  await expect(luke).toBeInTheDocument()
}) 

test("should display an error on bad request", async() => {
  render(<App/>);
 
})

test('handles 418 error', async () => {
  server.use(
    rest.get('https://swapi.dev/api/people/1', (req, res, ctx) => {
      return res(ctx.status(418))
    }),
  )
  render(<App />);
  screen.queryByRole('alertdialog',{description: `418 I'm a tea pot 🫖, silly`})
});

test('handles 500 error', async () => {
  server.use(
    rest.get('https://swapi.dev/api/people/1', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )
  render(<App />);
  screen.queryByRole('alertdialog',{description: `Oops... something went wrong, try again 🤕`})
});
