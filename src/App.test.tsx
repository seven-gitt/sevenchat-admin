import { render, screen } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { BrowserRouter } from "react-router-dom";
fetchMock.enableMocks();

jest.mock("./synapse/authProvider", () => ({
  __esModule: true,
  default: {
    logout: jest.fn().mockResolvedValue(undefined),
  },
}));

import App from "./App";

describe("App", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    fetchMock.resetMocks();
    // Mock any fetch call to return empty JSON immediately
    fetchMock.mockResponseOnce(JSON.stringify({}));
  });

  it("renders", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await screen.findAllByText("Welcome to Synapse Admin");
  });
});
