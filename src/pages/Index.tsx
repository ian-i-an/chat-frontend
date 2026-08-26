import { ArrowRight, Link2, MessageCircle, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="flex flex-1 overflow-y-auto px-5 pt-10 pb-12 sm:pt-16">
      <main className="mx-auto flex w-full max-w-3xl flex-col items-center">
        <section className="flex max-w-xl flex-col items-center text-center">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-200">
            <MessageCircle className="h-7 w-7" />
          </div>

          <h1 className="text-3xl leading-tight font-black text-gray-950 sm:text-4xl">
            아싸들의 연결고리,
            <br />
            첨벙
          </h1>

          <p className="mt-5 max-w-md text-sm leading-6 font-medium text-gray-500 sm:text-base sm:leading-7">
            친구가 적어도, 먼저 다가가는 게 서툴러도 괜찮아요.
            <br />
            부담 없이 만나고 천천히 가까워지는 우리만의 놀이터예요.
          </p>

          <Link
            to="/rooms"
            className="mt-8 flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-200 transition-colors hover:bg-blue-400 active:bg-blue-400"
          >
            연결 시작하기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <section className="mt-14 grid w-full grid-cols-1 border-y border-gray-200 sm:grid-cols-3 sm:divide-x sm:divide-gray-200">
          <div className="flex items-start gap-3 px-4 py-5">
            <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
            <div>
              <h2 className="text-sm font-bold text-gray-900">
                가볍게 말을 걸고
              </h2>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                거창한 소개 없이 편하게 시작해요.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 border-t border-gray-200 px-4 py-5 sm:border-t-0">
            <Link2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
            <div>
              <h2 className="text-sm font-bold text-gray-900">
                느슨하게 연결되고
              </h2>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                서로의 속도에 맞춰 관계를 이어가요.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 border-t border-gray-200 px-4 py-5 sm:border-t-0">
            <UserRound className="mt-0.5 h-5 w-5 shrink-0 text-violet-500" />
            <div>
              <h2 className="text-sm font-bold text-gray-900">함께 놀고</h2>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                우리에게 맞는 즐거움을 나눠요.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
