<p align="center">
   <h1 align="center">IDE V1</h1>
</p>

A simple dockerized Nodejs Express backend to compile programs written C, C++, python3.

> This is a really simple base version. Scaled version using k8 with a really efficient architecture is coming soon. :smile:

### Built With

-   [nodejs](https://nodejs.org)
-   [docker](https://www.docker.com)

## Getting Started

### Prerequisites

-   NodeJS
-   Docker

### Installation

1. Start the docker engine
2. Clone the repo
    ```bash
    git clone https://github.com/akhilmhdh/ide.git
    cd ide
    ```
3. Start the application using docker-compose

```bash
  docker-compose -f Dockerfile.dev up
```

4. Visit `http://localhost:8000`

### Running Test

```bash
    docker-compose -f Dockerfile.test up
```

### Route

-   Endpoint: POST /code/compile
-   Request body format JSON

| Key    | Value                        | Required |
| ------ | ---------------------------- | -------- |
| script | base64 encoded program code  | True     |
| lang   | c, c++, python3              | True     |
| input  | base64 encoded program input | False    |

> Multiple needed programs can also be added furthur by changing the dockerfile and adding code running command in [codeRunner class](src/api/compiler/codeRunner.ts)

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.
