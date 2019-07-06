import "jest-dom/extend-expect";
import "@testing-library/react/cleanup-after-each";
import React from "react";
import ReactDOM from "react-dom";
import App from "../components/App";
import { createMemoryHistory } from "history";
import { Router, MemoryRouter } from "react-router-dom";
import { render, fireEvent, getByLabelText } from "@testing-library/react";
import mockAxios from "axios";

jest.mock("axios");
const spyPost = jest.spyOn(mockAxios, "post");

describe("the App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("redirects to the login page when user is not signed in", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getByTestId, queryByTestId } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    expect(getByTestId("login")).toBeInTheDocument();
    expect(queryByTestId("catch-wrong-routes")).not.toBeInTheDocument();
  });

  it.skip("navigates to the home page when I key in correct credentials", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { queryByTestId, getByTestId, getByLabelText } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    spyPost.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
      })
    );

    const userName = getByLabelText(/username/i);
    const password = getByLabelText(/password/i);
    const submitButton = getByTestId("login-button");

    fireEvent.change(userName, { target: { value: "brandonnn" } });
    fireEvent.change(password, { target: { value: "Abcde1234." } });
    fireEvent.click(submitButton);

    expect(spyPost).toHaveBeenCalledTimes(1);
    expect(queryByTestId("login")).not.toBeInTheDocument();
  });
});
