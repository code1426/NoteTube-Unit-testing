import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import NoteInputForm from "../Notes/NoteInputForm";
import {
  MAX_TEXT_INPUT_LENGTH,
  MIN_TEXT_INPUT_LENGTH,
} from "@/utils/constants";

const mockOnSubmit = vi.fn();

describe("The note input form", () => {
  beforeEach(() => {
    render(<NoteInputForm onSubmit={mockOnSubmit} disabled={false} />);
  });

  it("should show an error message when submitting an empty input", async () => {
    const submitButton = screen.getByRole("button");

    fireEvent.click(submitButton);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "You must enter some text",
    );
  });

  it("should show an error message when submitting text less the min input length", async () => {
    const submitButton = screen.getByRole("button");

    fireEvent.input(screen.getByRole("textbox"), {
      target: {
        value: "a",
      },
    });

    fireEvent.click(submitButton);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      `Input must be at least ${MIN_TEXT_INPUT_LENGTH} characters`,
    );
  });

  it("should show an error message when submitting text more than the max input length", async () => {
    const submitButton = screen.getByRole("button");

    fireEvent.input(screen.getByRole("textbox"), {
      target: {
        value: "a".repeat(MAX_TEXT_INPUT_LENGTH + 1),
      },
    });

    fireEvent.click(submitButton);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      `Input must be less than ${MAX_TEXT_INPUT_LENGTH} characters`,
    );
  });
});
