import axios from "axios";
// and we will use this user-event to click the button.
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import RandomUser from "./RandomUser";
// this test will be having async/await
it("displays title, first and lastname of loaded user from randomuser.me", async () => {
  render(<RandomUser />);
  const loadButton = screen.queryByRole("button", {
    name: "Load Random User",
  });

  // we will click the button but our request must not be going
  // to the real server. we can't be sure how that request
  // ends up. So we will mock it. Lets make sure we set what
  // axios will return.
  // lets define the mock function first
  // axios get, post ... functions are promise and here
  // we will mock success response by mockResolvedValue
  // and we will return the axios response object.
  // so we put the actual api response into data object here
  const mockApiCall = jest.fn().mockResolvedValue({
    data: {
      results: [
        {
          name: {
            title: "Miss",
            first: "Jennifer",
            last: "Alvarez",
          },
        },
      ],
    },
  });
  // now lets assign this mock function to axios.get
  axios.get = mockApiCall;
  // then we can click the button
  userEvent.click(loadButton);
  // and we expect to see this text on screen.
  // this is dependent onto async operation to complete
  // so to wait that api call to finish, we use this findBy...
  const userInfo = await screen.findByText("Miss Jennifer Alvarez");
  expect(userInfo).toBeInTheDocument();
});
