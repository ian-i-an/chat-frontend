import Fallback from "@/components/common/Fallback";
import Loader from "@/components/common/Loader";
import { useFetchQuiz } from "@/hooks/use-quiz";
import { Crown, Home, Medal, RotateCcw, Trophy } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";

interface QuizResultRouteState {
  nickname?: string;
}

const MOCK_RESULT = {
  score: 82,
  rank: 7,
  participantCount: 64,
  rankings: [
    { rank: 1, nickname: "푸른파도", score: 100 },
    { rank: 2, nickname: "작은별", score: 96 },
    { rank: 3, nickname: "느린구름", score: 94 },
    { rank: 4, nickname: "밤산책", score: 91 },
    { rank: 5, nickname: "유리구슬", score: 88 },
    { rank: 6, nickname: "잔잔한물결", score: 85 },
    { rank: 7, nickname: "나", score: 82, isMe: true },
  ],
};

export default function QuizResultPage() {
  const { code = "" } = useParams();
  const location = useLocation();
  const { data: quiz, isLoading, isError, refetch } = useFetchQuiz(code);
  const nickname =
    (location.state as QuizResultRouteState | null)?.nickname?.trim() ||
    "익명 참가자";
  const rankings = MOCK_RESULT.rankings.map((participant) =>
    participant.isMe ? { ...participant, nickname } : participant,
  );

  if (isLoading) return <Loader fullPage />;
  if (isError || !quiz) return <Fallback onRetry={() => refetch()} />;

  return (
    <div className="app-layout">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 px-4">
        <Link to="/" className="text-lg font-black text-primary">
          첨벙
        </Link>
        <span className="text-sm font-bold text-muted-foreground">퀴즈 결과</span>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 pb-12">
        <main className="mx-auto w-full max-w-xl">
          <section className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-500">
              <Trophy className="h-7 w-7" />
            </div>
            <p className="mt-4 text-sm font-bold text-primary">내 결과</p>
            <h1 className="mt-1 text-xl font-black text-foreground">
              {quiz.title}
            </h1>
          </section>

          <section className="mt-6 grid grid-cols-2 border-y border-border py-5 text-center">
            <div className="border-r border-border">
              <p className="text-sm font-bold text-muted-foreground">점수</p>
              <p className="mt-1 text-3xl font-black text-primary">
                {MOCK_RESULT.score}
                <span className="ml-1 text-base">점</span>
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground">내 순위</p>
              <p className="mt-1 text-3xl font-black text-foreground">
                {MOCK_RESULT.rank}
                <span className="ml-1 text-base">등</span>
              </p>
              <p className="mt-1 text-xs text-subtle-foreground">
                {MOCK_RESULT.participantCount}명 중
              </p>
            </div>
          </section>

          <section className="mt-7">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-primary">Leaderboard</p>
                <h2 className="mt-1 text-lg font-black text-foreground">
                  전체 순위
                </h2>
              </div>
              <span className="text-xs font-medium text-subtle-foreground">
                총 {MOCK_RESULT.participantCount}명
              </span>
            </div>

            <div className="mt-4 divide-y divide-gray-100 border-y border-border">
              {rankings.map((participant) => (
                <div
                  key={participant.rank}
                  className={`flex min-h-14 items-center gap-3 px-3 py-2 ${
                    participant.isMe ? "bg-primary-soft" : ""
                  }`}
                >
                  <div className="flex w-8 shrink-0 items-center justify-center font-black">
                    {participant.rank === 1 ? (
                      <Crown className="h-5 w-5 text-amber-500" />
                    ) : participant.rank <= 3 ? (
                      <Medal className="h-5 w-5 text-subtle-foreground" />
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        {participant.rank}
                      </span>
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <span
                      className={`truncate text-sm font-bold ${
                        participant.isMe ? "text-blue-700" : "text-gray-700"
                      }`}
                    >
                      {participant.nickname}
                    </span>
                    {participant.isMe && (
                      <span className="shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-primary-strong">
                        나
                      </span>
                    )}
                  </div>
                  <span
                    className={`shrink-0 text-sm font-black ${
                      participant.isMe ? "text-primary-strong" : "text-gray-900"
                    }`}
                  >
                    {participant.score}점
                  </span>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-7 grid grid-cols-2 gap-2">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 rounded-lg border border-border bg-surface py-3 text-sm font-bold text-gray-600 transition-colors hover:bg-background"
            >
              <Home className="h-4 w-4" />
              홈으로
            </Link>
            <Link
              to={`/quizzes/${code}`}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-bold text-white transition-colors hover:bg-primary-hover"
            >
              <RotateCcw className="h-4 w-4" />
              다시 풀기
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
