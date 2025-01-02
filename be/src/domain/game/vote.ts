import { addSeconds, differenceInMilliseconds } from "date-fns";
import { AnswerDto, VoteType } from "../../../../common/dto";
import type { Room } from "../room";
import { VoteEntry, VotesDto } from "../../../../common/dto";
import { pick } from "../../../../common/utils/array";
import type { Player } from "../player";
import { TypedRoomSocket, TypedServerSocket } from "../../events/socket";

export type FinishCallback = (votes: Votes) => void;

interface VoteArgs {
  room: Room;
  type: VoteType;
  question: string;
  options: AnswerDto[];
  voteTime: number; // in seconds
  category: string | null;
  index: number;
  total: number;
  onFinish?: FinishCallback;
}

export class Vote {
  room: Room;
  type: VoteType;
  question: string;
  options: AnswerDto[];
  votes: Votes;
  category: string | null;
  index: number;
  total: number;
  onFinish?: FinishCallback;

  startedAt: Date;
  endsAt: Date;

  voteEndTimeoutId: NodeJS.Timeout | null = null;

  constructor({
    room,
    type,
    voteTime,
    question,
    options,
    onFinish,
    category,
    index,
    total,
  }: VoteArgs) {
    this.room = room;
    this.type = type;
    this.startedAt = new Date();
    this.endsAt = addSeconds(this.startedAt, voteTime);
    this.question = question;
    this.options = options;
    this.onFinish = onFinish;
    this.votes = new Votes(this.options);
    this.category = category;
    this.index = index;
    this.total = total;

    console.log(`Vote for ${this.type} started in room ${this.room.id}`);
    this.emitVoteStart(this.room.socket);

    this.voteEndTimeoutId = setTimeout(() => {
      this.voteEndTimeoutId = null;
      this.handleVoteFinish();
    }, voteTime * 1000);
  }

  emitVoteStart(socket: TypedServerSocket | TypedRoomSocket) {
    socket.emit(
      "vote-started",
      this.startedAt.toISOString(),
      this.endsAt.toISOString(),
      this.type,
      this.question,
      this.options,
      this.category,
      this.index,
      this.total
    );
  }

  vote(player: Player, answerId: number) {
    if (Number(new Date()) > Number(this.endsAt)) return;

    this.votes.addVote(player, answerId, this.startedAt);

    if (this.votes.getTotalVotes() === this.room.players.length) {
      this.handleVoteFinish();
    }
  }

  handleVoteFinish() {
    if (this.voteEndTimeoutId) {
      clearTimeout(this.voteEndTimeoutId);
      this.voteEndTimeoutId = null;
    }
    console.log(`Vote for ${this.type} finished in room ${this.room.id}`);

    this.onFinish?.(this.votes);
  }
}

export class Votes {
  votes: Map<number, VoteEntry[]>;

  constructor(options: AnswerDto[]) {
    this.votes = new Map();

    for (const option of options) {
      this.votes.set(option.id, []);
    }
  }

  getVotesForId(answerId: number) {
    const votes = this.votes.get(answerId);
    if (!votes) throw new Error("Invalid answerId.");
    return votes;
  }

  playerAlreadyVoted(player: Player): boolean {
    return [...this.votes.values()]
      .flatMap((votes) => votes.map((vote) => vote.playerId))
      .includes(player.id);
  }

  addVote(player: Player, answerId: number, startDate: Date) {
    if (this.playerAlreadyVoted(player)) return;

    const time = differenceInMilliseconds(new Date(), startDate) / 1000;
    const votes = this.votes.get(answerId);
    if (!votes) return;

    votes.push({
      playerId: player.id,
      time,
    });
  }

  getTotalVotes() {
    return [...this.votes.values()].flatMap((votes) => votes).length;
  }

  getMostVoted(): number {
    const groupedByVotes = Object.groupBy(
      this.votes.entries(),
      ([_, players]) => Object.values(players).length.toString()
    );
    const mostVotes = Math.max(...Object.keys(groupedByVotes).map(Number));
    const withMostVotes = groupedByVotes[mostVotes.toString()];
    if (!withMostVotes) {
      throw new Error("Something went wrong when choosing vote winner");
    }
    const winner = pick(withMostVotes, 1)[0];

    return Number(winner[0]);
  }

  toDto(): VotesDto {
    return Object.fromEntries(this.votes.entries());
  }
}
