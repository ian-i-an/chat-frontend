import Dialog from "@/components/common/Dialog";

export type AgreementType = "terms" | "privacy";

interface SignUpAgreementDialogProps {
  type: AgreementType;
  onClose: () => void;
}

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section>
    <h3 className="text-sm font-bold text-gray-900">{title}</h3>
    <div className="mt-2 text-sm leading-6 text-gray-600">{children}</div>
  </section>
);

function TermsContent() {
  return (
    <div className="flex flex-col gap-6">

      <Section title="1. 약관의 목적">
        이 약관은 첨벙이 제공하는 익명 채팅 서비스의 이용 조건과 운영자 및
        회원의 권리와 책임을 정하는 것을 목적으로 합니다.
      </Section>

      <Section title="2. 회원가입과 계정">
        <p>
          회원은 카카오 계정으로 본인 확인을 마치고 이 약관에 동의한 뒤
          가입할 수 있습니다. 서비스는 가입 시 임의의 닉네임을 생성하며,
          회원은 가입 후 닉네임을 변경할 수 있습니다.
        </p>
        <p className="mt-2">
          첨벙은 만 14세 이상인 사람만 가입할 수 있습니다.
        </p>
      </Section>

      <Section title="3. 제공하는 서비스">
        회원은 익명 채팅방을 만들고 링크를 공유할 수 있습니다. 링크를 받은
        사람은 별도의 가입 없이 채팅에 참여할 수 있습니다. 채팅방 링크를
        알고 있는 사람은 대화에 접근할 수 있으므로 공개를 원하지 않는
        개인정보나 민감한 내용을 작성하지 않아야 합니다.
      </Section>

      <Section title="4. 이용 시 지켜야 할 사항">
        다른 사람의 권리를 침해하거나 불법적인 내용, 괴롭힘, 혐오 표현,
        음란물, 스팸 또는 서비스 운영을 방해하는 내용을 작성해서는 안
        됩니다. 운영자는 안전한 서비스 제공을 위해 위반 콘텐츠를 삭제하거나
        이용을 제한할 수 있습니다.
      </Section>

      <Section title="5. 게시한 콘텐츠">
        회원이 작성한 콘텐츠에 대한 권리는 작성자에게 있습니다. 회원은
        서비스가 채팅을 저장하고 참여자에게 보여주는 등 서비스 제공에 필요한
        범위에서 해당 콘텐츠를 이용하는 것을 허락합니다.
      </Section>

      <Section title="6. 서비스 변경과 중단">
        점검, 장애 또는 운영상 필요한 사유로 서비스의 전부 또는 일부가 일시
        중단되거나 변경될 수 있습니다. 중요한 변경 사항은 서비스 화면을 통해
        안내합니다.
      </Section>

      <Section title="7. 회원 탈퇴">
        회원은 언제든지 프로필 화면에서 탈퇴할 수 있습니다. 탈퇴가 완료되면
        계정 정보와 회원이 소유한 채팅방은 삭제되며 복구할 수 없습니다.
      </Section>
    </div>
  );
}

function PrivacyContent() {
  return (
    <div className="flex flex-col gap-6">

      <Section title="수집·이용 목적">
        카카오 계정을 통한 회원 식별과 로그인, 회원 계정 관리, 익명 채팅방과
        채팅 기능 제공, 서비스 이용 기록 관리에 사용합니다.
      </Section>

      <Section title="수집하는 개인정보">
        <ul className="list-disc space-y-1 pl-5">
          <li>회원가입 시: 카카오 회원 식별값, 서비스에서 생성한 닉네임</li>
          <li>
            서비스 이용 시: 채팅방 이름, 채팅과 답장 내용, 채팅 작성 시각,
            읽음 상태
          </li>
        </ul>
      </Section>

      <Section title="보유 및 이용 기간">
        회원 탈퇴 시까지 보유하고 이용합니다. 회원이 직접 삭제한 콘텐츠와
        탈퇴한 회원의 개인정보는 지체 없이 파기합니다. 다만, 관계 법령에서
        일정 기간 보관하도록 정한 정보는 해당 기간 동안 분리하여 보관합니다.
      </Section>

      <Section title="동의를 거부할 권리">
        개인정보 수집·이용 동의를 거부할 수 있습니다. 다만, 위 정보는 회원
        식별과 서비스 제공에 필요한 최소 정보이므로 동의하지 않으면 회원가입과
        회원 전용 기능을 이용할 수 없습니다.
      </Section>

    </div>
  );
}

export default function SignUpAgreementDialog({
  type,
  onClose,
}: SignUpAgreementDialogProps) {
  const isTerms = type === "terms";

  return (
    <Dialog
      title={isTerms ? "서비스 이용약관" : "개인정보 수집·이용 동의"}
      onClose={onClose}
    >
      <div className="overflow-y-auto p-5">
        {isTerms ? <TermsContent /> : <PrivacyContent />}
      </div>
    </Dialog>
  );
}
