# Books
## Instalacja zależności
```bash
npm install
```
## Utworzenie bazy danych (Postgres) w kontenerze Dockera
```bash
make up
```
## Synchronizacja z bazą danych
```bash
npx prisma db push
```
## Dodanie randomowych danych do bazy
```bash
make seed
```
## Uruchomienie aplikacji
```bash
npm run dev
```
## Usunięcie bazy danych
```bash
make drop
```
## Zalogowanie się do bazy danych przez konsolę
```bash
make db
```