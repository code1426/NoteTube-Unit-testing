// RegisterPage.stories.tsx

import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { within, userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import RegisterPage from "../pages/RegisterPage";

// Define the type for setAuth as used in your RegisterPage props.
type SetAuth = (value: boolean) => void;

// Extend the function type with a "calls" property to record calls.
interface SetAuthMock extends SetAuth {
  calls: boolean[][];
}

// Create the mock function with type SetAuthMock.
const setAuthMock: SetAuthMock = ((_value: boolean) => {
  setAuthMock.calls.push([true]);
}) as SetAuthMock;

// Initialize the calls array.
setAuthMock.calls = [];

const meta: Meta<typeof RegisterPage> = {
  title: "Pages/RegisterPage",
  component: RegisterPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RegisterPage>;

export const Default: Story = {
  args: {
    setAuth: setAuthMock,
  },
};

export const ErrorState: Story = {
  args: {
    setAuth: setAuthMock,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the "Sign Up" button without filling in the form.
    const submitButton = canvas.getByRole("button", { name: /sign up/i });
    await userEvent.click(submitButton);

    // Wait for error messages to appear.
    await waitFor(() => {
      expect(
        canvas.getByText(/please fill out the username/i),
      ).toBeInTheDocument();
      expect(
        canvas.getByText(/please fill out the email/i),
      ).toBeInTheDocument();
      expect(
        canvas.getByText(/please fill out the password/i),
      ).toBeInTheDocument();
      expect(
        canvas.getByText(/please fill out the confirm password/i),
      ).toBeInTheDocument();
    });
  },
};

export const WithPlayFunction: Story = {
  args: {
    setAuth: setAuthMock,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Get the input fields by their placeholder text.
    const usernameInput = canvas.getByPlaceholderText(/enter your username/i);
    const emailInput = canvas.getByPlaceholderText(/enter your email address/i);
    const passwordInput = canvas.getByPlaceholderText(
      /must be at least 8 characters/i,
    );
    const confirmPasswordInput = canvas.getByPlaceholderText(
      /re-enter your password/i,
    );

    // Fill in the form with valid data.
    await userEvent.type(usernameInput, "testuser", { delay: 100 });
    await userEvent.type(emailInput, "test@example.com", { delay: 100 });
    await userEvent.type(passwordInput, "password123", { delay: 100 });
    await userEvent.type(confirmPasswordInput, "password123", { delay: 100 });

    // Click the "Sign Up" button.
    const submitButton = canvas.getByRole("button", { name: /sign up/i });
    await userEvent.click(submitButton);

    // Wait for the asynchronous setAuth call (triggered after the 1-second delay) to be made.
    await waitFor(
      () => {
        // Assert that setAuthMock was called with true.
        expect(setAuthMock.calls).toContainEqual([true]);
      },
      { timeout: 1500 }, // Allow extra time for the delay.
    );
  },
};
