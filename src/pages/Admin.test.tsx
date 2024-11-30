import { render, screen } from 'test-utils';
import Admin from './Admin'

describe('Admin', () => {
  test('renders the App component', () => {
    render(<Admin />)

    expect(screen.getByText('Esta é a página administrativa.')).toBeInTheDocument();
  })
})