import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

describe('Button', () => {
  it('renders with the given text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Submit</Button>);

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is passed', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button', { name: /disabled/i })).toBeDisabled();
  });

  it('renders as a different element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/home">Home</a>
      </Button>
    );
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  });
});
