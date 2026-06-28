import Button from "@/components/common/Button";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-12 text-center">
        <h1 className="text-2xl font-black tracking-tight text-blue-500">
          Anonymous Chat
        </h1>
        <p className="text-sm font-medium text-gray-400">
          익명으로 만나는 공간
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          onClick={() => {
            navigate("/sign-in");
          }}
        >
          로그인
        </Button>
        <Button
          onClick={() => {
            navigate("/sign-up");
          }}
          variant={"outline"}
        >
          회원가입
        </Button>
      </div>
    </div>
  );
}
