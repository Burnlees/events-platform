import { currentUser, User } from "@clerk/nextjs/server";
import { describe, expect, test, vi } from "vitest";
import { filterRegisteredEvents } from "../src/lib/filter-registered-events";
import { getMyEvents } from "../src/server/queries";

type UserId = Pick<User, "id">;

vi.mock("@clerk/nextjs/server", () => {
  return {
    currentUser: vi.fn((): UserId | null => {
      return { id: "1" };
    }),
  };
});

vi.mock("../src/server/queries", () => {
  return {
    getMyEvents: vi.fn(),
  };
});

describe("filterRegisteredEvents", () => {
  test("should return a full array of event objects if user not authorized", async () => {
    const input: EventDetails[] = [
      {
        id: 1,
        name: "Imagine Dragons: LOOM World Tour 2025",
        date: "2025-07-25",
        time: "17:00:00",
        venue: "Tottenham Hotspur Stadium",
        city: "London",
        country: "Great Britain",
        image:
          "https://s1.ticketm.net/dam/a/e8c/5265b9d2-a06c-4dc8-a432-a8dd9d042e8c_SOURCE",
        createdAt: "2025-01-06T12:41:49.034Z",
        updatedAt: "2025-01-06T12:41:48.560Z",
      },
      {
        id: 2,
        name: "Imagine Dragons: LOOM World Tour 2025",
        date: "2025-07-26",
        time: "17:00:00",
        venue: "Tottenham Hotspur Stadium",
        city: "London",
        country: "Great Britain",
        image:
          "https://s1.ticketm.net/dam/a/e8c/5265b9d2-a06c-4dc8-a432-a8dd9d042e8c_SOURCE",
        createdAt: "2025-01-06T12:41:49.570Z",
        updatedAt: "2025-01-06T12:41:49.093Z",
      },
    ];

    const expected = [...input];

    vi.mocked(currentUser).mockImplementationOnce(() => {
      return Promise.resolve(null);
    });

    const actual = await filterRegisteredEvents(input);

    expect(currentUser).toBeCalled();
    expect(actual).toEqual(expected);
  });
  test("should return the correct filtered array of event objects when a user with registered events is authorized", async () => {
    const input: EventDetails[] = [
      {
        id: 1,
        name: "Imagine Dragons: LOOM World Tour 2025",
        date: "2025-07-25",
        time: "17:00:00",
        venue: "Tottenham Hotspur Stadium",
        city: "London",
        country: "Great Britain",
        image:
          "https://s1.ticketm.net/dam/a/e8c/5265b9d2-a06c-4dc8-a432-a8dd9d042e8c_SOURCE",
        createdAt: "2025-01-06T12:41:49.034Z",
        updatedAt: "2025-01-06T12:41:48.560Z",
      },
      {
        id: 2,
        name: "Imagine Dragons: LOOM World Tour 2025",
        date: "2025-07-26",
        time: "17:00:00",
        venue: "Tottenham Hotspur Stadium",
        city: "London",
        country: "Great Britain",
        image:
          "https://s1.ticketm.net/dam/a/e8c/5265b9d2-a06c-4dc8-a432-a8dd9d042e8c_SOURCE",
        createdAt: "2025-01-06T12:41:49.570Z",
        updatedAt: "2025-01-06T12:41:49.093Z",
      },
    ];

    const expected = [
      {
        id: 1,
        name: "Imagine Dragons: LOOM World Tour 2025",
        date: "2025-07-25",
        time: "17:00:00",
        venue: "Tottenham Hotspur Stadium",
        city: "London",
        country: "Great Britain",
        image:
          "https://s1.ticketm.net/dam/a/e8c/5265b9d2-a06c-4dc8-a432-a8dd9d042e8c_SOURCE",
        createdAt: "2025-01-06T12:41:49.034Z",
        updatedAt: "2025-01-06T12:41:48.560Z",
      },
    ];

    const mockUserId = await currentUser();

    vi.mocked(getMyEvents).mockResolvedValueOnce([
      {
        id: 2,
        name: "Imagine Dragons: LOOM World Tour 2025",
        date: "2025-07-26",
        time: "17:00:00",
        venue: "Tottenham Hotspur Stadium",
        city: "London",
        country: "Great Britain",
        image:
          "https://s1.ticketm.net/dam/a/e8c/5265b9d2-a06c-4dc8-a432-a8dd9d042e8c_SOURCE",
        createdAt: "2025-01-06T12:41:49.570Z",
        updatedAt: "2025-01-06T12:41:49.093Z",
      },
    ]);

    const actual = await filterRegisteredEvents(input);

    expect(getMyEvents).toBeCalled();
    expect(getMyEvents).toBeCalledWith(mockUserId?.id);
    expect(actual).toEqual(expected);
  });
  test("should return an unfiltered array of event objects if the authorized user has no registered events", async () => {
    const input: EventDetails[] = [
      {
        id: 1,
        name: "Imagine Dragons: LOOM World Tour 2025",
        date: "2025-07-25",
        time: "17:00:00",
        venue: "Tottenham Hotspur Stadium",
        city: "London",
        country: "Great Britain",
        image:
          "https://s1.ticketm.net/dam/a/e8c/5265b9d2-a06c-4dc8-a432-a8dd9d042e8c_SOURCE",
        createdAt: "2025-01-06T12:41:49.034Z",
        updatedAt: "2025-01-06T12:41:48.560Z",
      },
      {
        id: 2,
        name: "Imagine Dragons: LOOM World Tour 2025",
        date: "2025-07-26",
        time: "17:00:00",
        venue: "Tottenham Hotspur Stadium",
        city: "London",
        country: "Great Britain",
        image:
          "https://s1.ticketm.net/dam/a/e8c/5265b9d2-a06c-4dc8-a432-a8dd9d042e8c_SOURCE",
        createdAt: "2025-01-06T12:41:49.570Z",
        updatedAt: "2025-01-06T12:41:49.093Z",
      },
    ];

    const expected = [...input];

    const mockUserId = await currentUser();

    vi.mocked(getMyEvents).mockResolvedValueOnce([]);

    const actual = await filterRegisteredEvents(input);

    expect(actual).toEqual(expected);
  });
  test("should not mutate the input array", async () => {
    const input: EventDetails[] = [
      {
        id: 1,
        name: "Imagine Dragons: LOOM World Tour 2025",
        date: "2025-07-25",
        time: "17:00:00",
        venue: "Tottenham Hotspur Stadium",
        city: "London",
        country: "Great Britain",
        image:
          "https://s1.ticketm.net/dam/a/e8c/5265b9d2-a06c-4dc8-a432-a8dd9d042e8c_SOURCE",
        createdAt: "2025-01-06T12:41:49.034Z",
        updatedAt: "2025-01-06T12:41:48.560Z",
      },
      {
        id: 2,
        name: "Imagine Dragons: LOOM World Tour 2025",
        date: "2025-07-26",
        time: "17:00:00",
        venue: "Tottenham Hotspur Stadium",
        city: "London",
        country: "Great Britain",
        image:
          "https://s1.ticketm.net/dam/a/e8c/5265b9d2-a06c-4dc8-a432-a8dd9d042e8c_SOURCE",
        createdAt: "2025-01-06T12:41:49.570Z",
        updatedAt: "2025-01-06T12:41:49.093Z",
      },
    ];
    const inputCopy: EventDetails[] = [
      {
        id: 1,
        name: "Imagine Dragons: LOOM World Tour 2025",
        date: "2025-07-25",
        time: "17:00:00",
        venue: "Tottenham Hotspur Stadium",
        city: "London",
        country: "Great Britain",
        image:
          "https://s1.ticketm.net/dam/a/e8c/5265b9d2-a06c-4dc8-a432-a8dd9d042e8c_SOURCE",
        createdAt: "2025-01-06T12:41:49.034Z",
        updatedAt: "2025-01-06T12:41:48.560Z",
      },
      {
        id: 2,
        name: "Imagine Dragons: LOOM World Tour 2025",
        date: "2025-07-26",
        time: "17:00:00",
        venue: "Tottenham Hotspur Stadium",
        city: "London",
        country: "Great Britain",
        image:
          "https://s1.ticketm.net/dam/a/e8c/5265b9d2-a06c-4dc8-a432-a8dd9d042e8c_SOURCE",
        createdAt: "2025-01-06T12:41:49.570Z",
        updatedAt: "2025-01-06T12:41:49.093Z",
      },
    ];

    vi.mocked(getMyEvents).mockResolvedValueOnce([
      {
        id: 2,
        name: "Imagine Dragons: LOOM World Tour 2025",
        date: "2025-07-26",
        time: "17:00:00",
        venue: "Tottenham Hotspur Stadium",
        city: "London",
        country: "Great Britain",
        image:
          "https://s1.ticketm.net/dam/a/e8c/5265b9d2-a06c-4dc8-a432-a8dd9d042e8c_SOURCE",
        createdAt: "2025-01-06T12:41:49.570Z",
        updatedAt: "2025-01-06T12:41:49.093Z",
      },
    ]);

    await filterRegisteredEvents(input);

    expect(input).toEqual(inputCopy);
  });
  test("should output array should have a different memory reference to that of the input array", async () => {
    const input: EventDetails[] = [
      {
        id: 1,
        name: "Imagine Dragons: LOOM World Tour 2025",
        date: "2025-07-25",
        time: "17:00:00",
        venue: "Tottenham Hotspur Stadium",
        city: "London",
        country: "Great Britain",
        image:
          "https://s1.ticketm.net/dam/a/e8c/5265b9d2-a06c-4dc8-a432-a8dd9d042e8c_SOURCE",
        createdAt: "2025-01-06T12:41:49.034Z",
        updatedAt: "2025-01-06T12:41:48.560Z",
      },
      {
        id: 2,
        name: "Imagine Dragons: LOOM World Tour 2025",
        date: "2025-07-26",
        time: "17:00:00",
        venue: "Tottenham Hotspur Stadium",
        city: "London",
        country: "Great Britain",
        image:
          "https://s1.ticketm.net/dam/a/e8c/5265b9d2-a06c-4dc8-a432-a8dd9d042e8c_SOURCE",
        createdAt: "2025-01-06T12:41:49.570Z",
        updatedAt: "2025-01-06T12:41:49.093Z",
      },
    ];

    vi.mocked(getMyEvents).mockResolvedValueOnce([
      {
        id: 2,
        name: "Imagine Dragons: LOOM World Tour 2025",
        date: "2025-07-26",
        time: "17:00:00",
        venue: "Tottenham Hotspur Stadium",
        city: "London",
        country: "Great Britain",
        image:
          "https://s1.ticketm.net/dam/a/e8c/5265b9d2-a06c-4dc8-a432-a8dd9d042e8c_SOURCE",
        createdAt: "2025-01-06T12:41:49.570Z",
        updatedAt: "2025-01-06T12:41:49.093Z",
      },
    ]);

    const actual = await filterRegisteredEvents(input);

    expect(actual).not.toBe(input);
  });
});
