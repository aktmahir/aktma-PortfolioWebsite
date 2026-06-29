import { describe, it, expect } from 'vitest';
import { render, screen, within, fireEvent } from '@testing-library/react';
import App from './App';

describe('Navigation', () => {
  it('renders the header with brand and nav items', () => {
    render(<App />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    const nav = screen.getByRole('navigation');
    expect(within(nav).getByText('About')).toBeInTheDocument();
    expect(within(nav).getByText('Expertise')).toBeInTheDocument();
    expect(within(nav).getByText('Experience')).toBeInTheDocument();
    expect(within(nav).getByText('Projects')).toBeInTheDocument();
    expect(within(nav).getByText('Contact')).toBeInTheDocument();
  });

  it('links to the contact section via anchor', () => {
    render(<App />);
    const contactLink = screen.getByRole('link', { name: /get in touch/i });
    expect(contactLink).toHaveAttribute('href', '#contact');
  });

  it('links to the projects section via anchor', () => {
    render(<App />);
    const projectsLinks = screen.getAllByRole('link', { name: /view work/i });
    expect(projectsLinks.length).toBeGreaterThan(0);
    projectsLinks.forEach((link) => expect(link).toHaveAttribute('href', '#projects'));
  });
});

describe('Contact Form', () => {
  it('renders all required form fields', () => {
    render(<App />);
    expect(screen.getByLabelText(/name \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message \*/i)).toBeInTheDocument();
  });

  it('validates required fields on empty submit', async () => {
    render(<App />);
    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/subject is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/message is required/i)).toBeInTheDocument();
  });

  it('renders the footer', () => {
    render(<App />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
  });
});
