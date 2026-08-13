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
            링크 하나로 시작하는
            <br />
            익명 채팅
          </h1>

          <p className="mt-5 max-w-md text-sm leading-6 font-medium text-gray-500 sm:text-base sm:leading-7">
            채팅방을 만들고 링크를 공유해보세요. <br/>
            초대받은 사람은 별도의 가입 없이 익명으로 대화에 참여할 수 있어요.
          </p>

          <Link
            to="/rooms"
            className="mt-8 flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-200 transition-colors hover:bg-blue-400 active:bg-blue-400"
          >
            내 채팅방으로 가기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <section className="mt-14 grid w-full grid-cols-1 border-y border-gray-200 sm:grid-cols-3 sm:divide-x sm:divide-gray-200">
          <div className="flex items-start gap-3 px-4 py-5">
            <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
            <div>
              <h2 className="text-sm font-bold text-gray-900">방을 만들고</h2>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                대화를 나눌 공간을 만들어요.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 border-t border-gray-200 px-4 py-5 sm:border-t-0">
            <Link2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
            <div>
              <h2 className="text-sm font-bold text-gray-900">링크를 나누고</h2>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                함께할 사람을 간단히 초대해요.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 border-t border-gray-200 px-4 py-5 sm:border-t-0">
            <UserRound className="mt-0.5 h-5 w-5 shrink-0 text-violet-500" />
            <div>
              <h2 className="text-sm font-bold text-gray-900">
                익명으로 이야기하고
              </h2>
              <p className="mt-1 text-sm leading-5 text-gray-500">
                부담 없이 대화를 이어가요.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
