import Fallback from "@/components/common/Fallback";
import Loader from "@/components/common/Loader";
import { useFetchQuiz } from "@/hooks/use-quiz";
import { Crown, Home, Medal, RotateCcw, Trophy } from "lucide-react";
import { Link, useParams } from "react-router-dom";

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
  const { data: quiz, isLoading, isError, refetch } = useFetchQuiz(code);

  if (isLoading) return <Loader fullPage />;
  if (isError || !quiz) return <Fallback onRetry={() => refetch()} />;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 px-4">
        <Link to="/" className="text-lg font-black text-blue-500">
          첨벙
        </Link>
        <span className="text-sm font-bold text-gray-500">퀴즈 결과</span>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 pb-12">
        <main className="mx-auto w-full max-w-xl">
          <section className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-500">
              <Trophy className="h-7 w-7" />
            </div>
            <p className="mt-4 text-sm font-bold text-blue-500">내 결과</p>
            <h1 className="mt-1 text-xl font-black text-gray-950">
              {quiz.title}
            </h1>
          </section>

          <section className="mt-6 grid grid-cols-2 border-y border-gray-200 py-5 text-center">
            <div className="border-r border-gray-200">
              <p className="text-sm font-bold text-gray-500">점수</p>
              <p className="mt-1 text-3xl font-black text-blue-500">
                {MOCK_RESULT.score}
                <span className="ml-1 text-base">점</span>
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500">내 순위</p>
              <p className="mt-1 text-3xl font-black text-gray-950">
                {MOCK_RESULT.rank}
                <span className="ml-1 text-base">등</span>
              </p>
              <p className="mt-1 text-xs text-gray-400">
                {MOCK_RESULT.participantCount}명 중
              </p>
            </div>
          </section>

          <section className="mt-7">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-blue-500">Leaderboard</p>
                <h2 className="mt-1 text-lg font-black text-gray-950">
                  전체 순위
                </h2>
              </div>
              <span className="text-xs font-medium text-gray-400">
                총 {MOCK_RESULT.participantCount}명
              </span>
            </div>

            <div className="mt-4 divide-y divide-gray-100 border-y border-gray-200">
              {MOCK_RESULT.rankings.map((participant) => (
                <div
                  key={participant.rank}
                  className={`flex min-h-14 items-center gap-3 px-3 py-2 ${
                    participant.isMe ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex w-8 shrink-0 items-center justify-center font-black">
                    {participant.rank === 1 ? (
                      <Crown className="h-5 w-5 text-amber-500" />
                    ) : participant.rank <= 3 ? (
                      <Medal className="h-5 w-5 text-gray-400" />
                    ) : (
                      <span className="text-sm text-gray-500">
                        {participant.rank}
                      </span>
                    )}
                  </div>
                  <span
                    className={`min-w-0 flex-1 truncate text-sm font-bold ${
                      participant.isMe ? "text-blue-700" : "text-gray-700"
                    }`}
                  >
                    {participant.nickname}
                  </span>
                  <span
                    className={`shrink-0 text-sm font-black ${
                      participant.isMe ? "text-blue-600" : "text-gray-900"
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
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-3 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-50"
            >
              <Home className="h-4 w-4" />
              홈으로
            </Link>
            <Link
              to={`/quizzes/${code}`}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-500 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-400"
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
