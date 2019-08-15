# Zigzag Challenge Web

---

## Challenge 1

### bowling-score-calculator

##### 위치 및 디렉토리 구조

```
zigzag_challenge_web/bowling-score-calculator
├── calculateScore.js     # 요구사항에 명시된 기능을 구현 한 함수
├── index.js
├── test.js               # 테스트 코드
└── README.md
```

##### Scripts

터미널에서 프로젝트 디렉토리로 이동 후 아래와 같이 실행합니다.

- **`node bowling-score-calculator/index.js`** :
  문제에서 제시한 테스트케이스를 이용해 함수를 호출하고 결과 값을 출력합니다.
- **`node bowling-score-calculator/test.js`**
  calculateScore 함수를 테스트하는 스크립트를 실행합니다.

### flatten-tree

##### 위치 및 디렉토리 구조

```
zigzag_challenge_web/flatten-tree
├── flattenTree.js        # 요구사항에 명시된 기능을 구현 한 함수
├── index.js
├── test.js               # 테스트 코드
├── categories.json
└── README.md
```

##### Scripts

터미널에서 프로젝트 디렉토리로 이동 후 아래와 같이 실행합니다.

- **`node flatten-tree/index.js`** :
  `categories.json` categories.json 파일을 읽어 flattenTree 에 인자로 넘긴 후 결과 값을 출력합니다.
- **`node flatten-tree/test.js`**
  flattenTree 함수를 테스트하는 스크립트를 실행합니다.

## Challenge 2

### graphql-crud

Node 10.16.1 / NPM 6.9.0 / React 16.9.0

##### 위치 및 디렉토리 구조

```
zigzag_challenge_web/flatten-tree
├── config
├── public
├── scripts
├── src                   # Application Source files
└── README.md
```

##### Scripts

어플리케이션을 실행하거나 빌드하기 전 먼저 터미널에서 프로젝트 디렉토리로 이동 후 아래와 같이 실행해 필요한 패키지들을 설치합니다.

```
$ npm i
```

패키지 설치가 끝났다면 `flatten-tree` 디렉토리로 이동 후 아래와 같이 실행합니다.

- **`npm start`**
  어플리케이션을 development 모드로 실행합니다.
  웹 브라우저로 [http://localhost:3000](http://localhost:3000)에 접속하면 실행 결과를 확인 할 수 있습니다.

- **`npm run build`**
  어플리케이션을 production 모드로 빌드하고 `zigzag_challenge_web/build` 디렉토리에 결과물을 저장합니다.
