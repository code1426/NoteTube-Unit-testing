import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { within, userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { jest } from "@storybook/jest";
import RegisterPage from "../pages/RegisterPage";

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

const setAuthMock = jest.fn();

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

    const submitButton = canvas.getByRole("button", { name: /sign up/i });
    await userEvent.click(submitButton);

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

    const usernameInput = canvas.getByPlaceholderText(/enter your username/i);
    const emailInput = canvas.getByPlaceholderText(/enter your email address/i);
    const passwordInput = canvas.getByPlaceholderText(
      /must be at least 8 characters/i,
    );
    const confirmPasswordInput = canvas.getByPlaceholderText(
      /re-enter your password/i,
    );

    await userEvent.type(usernameInput, "testuser");
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.type(confirmPasswordInput, "password123");

    const submitButton = canvas.getByRole("button", { name: /sign up/i });
    await userEvent.click(submitButton);

    // await waitFor(() => {
    //   expect(setAuthMock).toHaveBeenCalledWith(true);
    // });
  },
};
