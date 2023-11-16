FROM golang:alpine AS build
WORKDIR /app
COPY go.mod .
RUN go mod download && go mod verify
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o fullcycle .


FROM scratch
WORKDIR /app
COPY --from=build /app/fullcycle .
CMD [ "./fullcycle" ]