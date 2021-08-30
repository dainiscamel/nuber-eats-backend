# Nuber Eats

The Backend of Nuber Eats Clone

## [Backend Overview]

### User Model:

- id
- createdAt
- updatedAt

- email
- password
- role(client|owner|delivery) 

### User CRUD:

- Create Account
- Log In
- See Profile
- Edit Profile
- Verify Email

--- 

## [TIL]

### AppModule ? 
- main.ts(=애플리케이션을 실행하기 위한 것)로 import 되는 유일한 모듈로 데이터베이스, GraphQL,유저 등 모든 것들이 AppModule로 import 된다.

### Entity ? 
- 데이터베이스에 저장되는 데이터의 형태를 보여주는 모델.
- TypeORM 이 DB 에 Entity 모델을 저장.
### @ObjectType() 
- 자동으로 스키마를 빌드하기 위해 사용하는 GraphQL decorator

### @Entity() 
- TypeORM이 DB mapping되는 데이터베이스 테이블.

### ConfigService 
- dotenv는 .env파일에서 환경변수를 로드하는데 NestJS는 configuration module 이 dotenv의 최상위에서 실행되어 Nestjs 방식으로 동작.

- nest와 같은 프레임워크에서는 최소한 test/dev/prod 세 환경에서 실행하게 되는데 @nestjs/config를 통해 각 환경마다 다른 환경 변수를 사용할 필요가 있기 때문에 configuration module을 사용.

- 아래와 같이 별도의 환경 변수를 require하는 방식을 사용하지 않고 편리하게 사용 가능. 
`
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else if (process.env.NODE_ENV === 'testing') {
    module.exports = require('./test');
} else {
    module.exports = require('./dev');
}
`

###  Validating ConfigService
- joi ? 자바스크립트 데이터 유효성 검사 툴

###  Data Mapper vs Active Record
- DB와 상호작용할 때 쓰는 패턴.
- Repository 는 Data Mapper에서 Entity와 상호작용을 담당.
- Repository 는 Data Mapper에서 Entity와 상호작용을 담당.
- Data Mapper를 사용하여 NestJS + TypeORM 개발환경에서  Repository를 사용하는 모듈을 사용할 수 있다. 
- Data Mapper로 Repository를 사용하면 어디서든지 접근 가능.

###  Mapped Types
- base type을 바탕으로 다른 버전의 type들을 만들 수 있다.
- Mapped Types에는 Partial, Pick, Omit,Intersection 4가지 존재.
  1.  PartialType()
      - base type, base class를 가져다가 export하고, 모든 field가 required가 아닌 class로 만들어준다.

  2.  PickType()
      - input type에서 몇 가지 property를 선택해 새로운 class를 만들어 준다.
      
  3.  OmitType()
      - base class에서 class를 만드는데 몇몇 field를 제외하고 만들어 준다.
  4.  IntersectionType()
      - 두 input을 합쳐주는 역한을 한다.

### Entity Listener
- entity에 무슨일이 생길 때 실행.

