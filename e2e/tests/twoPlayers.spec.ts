import { test, expect, Page } from "@playwright/test";

const amountOfQuestionsInCategory = 5;

test("play regular game", async ({ browser }) => {
  const player1 = await browser.newContext();
  const player2 = await browser.newContext();

  const p1Page = await player1.newPage();
  const p2Page = await player2.newPage();

  await p1Page.goto("/");
  await p2Page.goto("/");

  await setNickname(p1Page, "Player 1");
  await setNickname(p2Page, "Player 2");

  const roomCode = await createRoom(p1Page);
  await joinRoom(p2Page, roomCode);

  const players = ["Player 1", "Player 2"];
  expectPlayersInRoom(p1Page, players);
  expectPlayersInRoom(p2Page, players);

  await startGame(p1Page);
  const p1CorrectAnswers = [true, true, true, true, true];
  const p2CorrectAnswers = [false, true, false, true, false];
  await Promise.all([
    playGame(p1Page, p1CorrectAnswers, 200),
    playGame(p2Page, p2CorrectAnswers, 100, 1000),
  ]);

  await player1.close();
  await player2.close();
});

test("Joining and leaving room works correctly", async ({ browser }) => {
  const player1 = await browser.newContext();
  const player2 = await browser.newContext();

  const p1Page = await player1.newPage();
  const p2Page = await player2.newPage();

  await p1Page.goto("/");
  await p2Page.goto("/");

  await setNickname(p1Page, "Player 1");
  await setNickname(p2Page, "Player 2");

  const roomCode = await createRoom(p1Page);
  await joinRoom(p2Page, roomCode);

  const players = ["Player 1", "Player 2"];
  expectPlayersInRoom(p1Page, players);
  expectPlayersInRoom(p2Page, players);

  await leaveRoom(p1Page);
  players.shift();
  expectPlayersInRoom(p2Page, players);

  await joinRoom(p1Page, roomCode);
  players.push("Player 1");
  expectPlayersInRoom(p1Page, players);
  expectPlayersInRoom(p2Page, players);

  await leaveRoom(p2Page);
  players.shift();
  expectPlayersInRoom(p1Page, players);

  await joinRoom(p2Page, roomCode);
  players.push("Player 2");
  expectPlayersInRoom(p1Page, players);
  expectPlayersInRoom(p2Page, players);

  await leaveRoom(p1Page);
  await leaveRoom(p2Page);

  await joinRoom(p1Page, roomCode, true);
  await joinRoom(p2Page, roomCode, false);
});

const setNickname = async (page: Page, name: string) => {
  await page.getByPlaceholder("Your name...").fill(name);
  await page.getByText("Continue").click();
  expect(page.getByText("Create room")).toBeVisible();
};

const createRoom = async (page: Page): Promise<string> => {
  await page.getByText("Create room").click();
  const roomCode = await page.getByTestId("room-code").textContent();
  expect(roomCode).not.toBeNull();
  return roomCode!;
};

const joinRoom = async (
  page: Page,
  roomCode: string,
  expectNotFound = false
) => {
  await page.getByText("Join room").click();
  await page.getByPlaceholder("ROOM-CODE").fill(roomCode);
  await page.getByText("Join").click();
  if (expectNotFound) {
    expect(page.getByText("Room not found")).toBeVisible();
    expect(page.getByText("Currently in room")).not.toBeVisible();
  } else {
    expect(page.getByText("Currently in room")).toBeVisible();
  }
};

const expectPlayersInRoom = async (page: Page, players: string[]) => {
  for (const player of players) {
    expect(page.getByText(player)).toBeVisible();
  }
};

const leaveRoom = async (page: Page) => {
  await page.getByText("Leave room").click();
  expect(page.getByText("Join room")).toBeVisible();
};

const startGame = async (page: Page) => {
  await page.getByText("Start game").click();
  expect(page.getByText("Vote for category!")).toBeVisible();
};

const selectFirstAnswer = async (page: Page): Promise<string> => {
  const answers = await page.getByTestId("answer").all();
  const answer = answers[0];
  await answer.click();
  const answerText = await answer.textContent();
  expect(answerText).not.toBeNull();
  return answerText!;
};

const playGame = async (
  page: Page,
  correctAnswers: Array<boolean>,
  pointsPerAnswer: number,
  delay = 0
) => {
  await new Promise((resolve) => setTimeout(resolve, delay));
  const selectedCategory = await selectFirstAnswer(page);

  for (let i = 0; i < amountOfQuestionsInCategory; i++) {
    await page.getByText(`${i + 1}/${amountOfQuestionsInCategory}`).waitFor();
    expect(
      page.getByText(`${i + 1}/${amountOfQuestionsInCategory}`)
    ).toBeVisible();
    expect(page.getByText(selectedCategory)).toBeVisible();

    const correct = correctAnswers[i];
    await new Promise((resolve) => setTimeout(resolve, delay));
    await page
      .getByText(correct ? "Correct" : "Incorrect 1", { exact: true })
      .click();
  }

  await page.getByText("Play again").waitFor();

  expect(
    page.getByText(
      (correctAnswers.filter(Boolean).length * pointsPerAnswer).toString()
    )
  ).toBeVisible();
};
