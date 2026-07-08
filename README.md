# Chat React

실시간 익명 채팅과 랜덤 매칭을 제공하는 React 기반 채팅 서비스입니다. 사용자는 별도의 프로필 노출 없이 랜덤 상대와 대화를 시작하거나, 직접 익명 채팅방을 만들어 메시지를 주고받을 수 있습니다.

이 프로젝트는 단순 화면 구현보다 실제 서비스 흐름에 가까운 인증, 보호 라우팅, WebSocket 연결, 채팅 목록 동기화, 무한 스크롤, 토큰 갱신 처리까지 포함하는 것을 목표로 만들었습니다.

## 주요 기능

- 랜덤 채팅
  - 첫 메시지를 입력한 뒤 랜덤 매칭 시작
  - 매칭 대기, 연결 완료, 상대방 퇴장, 재연결 상태 처리
  - STOMP WebSocket 기반 실시간 메시지 송수신

- 익명 채팅방
  - 채팅방 생성 및 목록 조회
  - 방별 실시간 채팅
  - 마지막 메시지와 읽지 않은 메시지 수 실시간 갱신
  - 메시지 삭제 및 답장 UI 지원

- 인증 및 사용자 흐름
  - 회원가입, 로그인, 프로필 조회
  - 인증이 필요한 페이지 보호
  - refresh token 요청 중복을 막는 401 재시도 큐 처리
  - 세션 만료 시 전역 이벤트로 로그인 화면 이동

- 모바일 중심 UX
  - 하단 입력창 중심의 채팅 화면
  - 모바일 키보드 높이에 맞춘 입력 영역 보정
  - 채팅 화면에서 스크롤과 입력 경험을 분리

## 기술 스택

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- TanStack React Query
- Zustand
- Tailwind CSS
- lucide-react
- sonner

### Realtime / Network

- Axios
- STOMP over WebSocket
- Cookie 기반 인증 요청
- REST API + WebSocket 이벤트 혼합 구조

### Tooling

- ESLint
- Prettier
- TypeScript build
- Vite production build

## 프로젝트 구조

```text
src
├── api              # Axios client와 REST API 요청 함수
├── components       # 공통 UI, 채팅, 방, 프로필, 네비게이션 컴포넌트
├── hooks            # React Query 기반 도메인 훅과 UI 훅
├── layout           # 라우트별 레이아웃, 보호 라우트, WebSocket 레이아웃
├── pages            # 라우팅 단위 페이지
├── store            # 전역 UI 상태
├── types            # API/WebSocket 도메인 타입
├── utils            # 공통 유틸
└── websocket        # STOMP client, WebSocket context, 구독 훅
```

## 라우팅 구조

```text
/                    # 랜덤 채팅 진입 화면
/sign-in             # 로그인
/sign-up             # 회원가입
/sign-up/password    # 비밀번호 설정
/rooms               # 내 익명 채팅방 목록
/profile             # 프로필
/random              # 랜덤 채팅
/:roomCode           # 채팅방 상세
```

인증이 필요한 `/rooms`, `/profile`은 `ProtectedRouteLayout`에서 사용자 프로필 조회 결과를 기준으로 접근을 제어합니다. WebSocket 연결이 필요한 화면은 `WebSocketLayout` 하위에 배치해 실시간 기능의 생명주기를 라우팅 구조와 함께 관리했습니다.

## 구현 포인트

### 1. Axios 인증 갱신 큐

API 요청에서 401 응답이 발생하면 refresh 요청을 보냅니다. 동시에 여러 요청이 401을 받는 경우 refresh 요청이 중복으로 발생하지 않도록 큐를 두고, refresh 성공 후 실패했던 요청들을 다시 실행하도록 구성했습니다.

### 2. React Query 기반 서버 상태 관리

채팅방 목록, 채팅방 상세, 메시지 목록은 React Query로 관리했습니다. 채팅 목록은 cursor 기반 무한 조회를 사용하고, WebSocket으로 들어온 채팅방 업데이트는 `queryClient.setQueryData`를 통해 기존 캐시를 직접 갱신합니다.

### 3. STOMP WebSocket 구독 분리

일반 채팅, 채팅방 목록 업데이트, 랜덤 채팅 이벤트를 각각 다른 훅으로 분리했습니다. 화면 컴포넌트는 이벤트를 받아 상태만 갱신하고, WebSocket 구독과 publish 로직은 도메인 훅이 담당하도록 구성했습니다.

### 4. 랜덤 채팅 상태 모델링

랜덤 채팅은 `idle`, `waiting`, `chatting`, `partnerLeft` 상태로 나누어 UI와 액션을 제어합니다. 서버 이벤트 타입도 `WAITING`, `MATCHED`, `MESSAGE`, `PARTNER_LEFT`, `ENDED`, `ERROR`로 구분해 화면 상태 전환을 명확하게 만들었습니다.

### 5. 채팅 UX 개선

채팅 입력창, 답장 미리보기, 삭제된 메시지 표시, 메시지 액션 메뉴, 스크롤 제어를 컴포넌트와 훅으로 분리했습니다. 모바일에서 키보드가 올라올 때 입력창이 가려지지 않도록 키보드 inset 훅도 별도로 구현했습니다.

## 환경 변수

프로젝트 실행에는 API 서버와 WebSocket 서버 주소가 필요합니다.

```env
VITE_API_URL=https://your-api.example.com
VITE_SOCKET_URL=wss://your-api.example.com/ws
```

Vite의 `VITE_` 접두사가 붙은 값은 클라이언트 번들에 포함되므로, 비밀키나 서버 전용 값은 넣지 않습니다.
