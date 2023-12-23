import { createTransport } from 'nodemailer';

export const transport = createTransport({
    service: import.meta.env.VITE_TRANSPORT_INFO_SERVICE,
    host: import.meta.env.VITE_TRANSPORT_INFO_HOST,
    port: import.meta.env.VITE_TRANSPORT_INFO_PORT,
    secure: false,
    auth: {
      user: import.meta.env.VITE_TRANSPORT_INFO_AUTH_USER,
      pass: import.meta.env.VITE_TRANSPORT_INFO_AUTH_PASS,
    },
  })

/**: @USE
 * transport로 선언 후
 * 사용할 부분에 아래 로직 추가
 * transport.sendMail({
        from: `SMWU <test@naver.com>`,
        to: user_id,
        subject: '[test] 비밀번호 변경 URL 안내드립니다.',
        html: changePwFormat
    }).then(send => res.json(send))
    .catch(err => next(err))
 */