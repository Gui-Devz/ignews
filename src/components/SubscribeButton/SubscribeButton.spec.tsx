import { render, screen, fireEvent } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { useSession, signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { SubscribeButton } from ".";

jest.mock("next-auth/client");

jest.mock("next/router");

describe("SubscribeButton component", () => {
  it("should render correctly", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SubscribeButton />);

    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });

  it("should redirect user to sign in when not authenticated", () => {
    const useSessionMocked = mocked(useSession);
    const signInMocked = mocked(signIn);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it("should redirect to posts when user is already a subscriber", () => {
    const useRouterMocked = mocked(useRouter);
    const useSessionMocked = mocked(useSession);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce([
      {
        user: { name: "John Doe", email: "jogh.doe@example.com" },
        expires: "fake-expires",
        activeSubscription: "fake-active-subscription",
      },
      false,
    ]);

    useRouterMocked.mockReturnValueOnce({ push: pushMock } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalledWith("/posts");
  });
});
