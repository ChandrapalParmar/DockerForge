FROM node:22

WORKDIR /app

COPY backend ./backend
COPY frontend ./frontend

RUN cd backend && npm install
RUN cd frontend && npm install

EXPOSE 3000
EXPOSE 5000

CMD ["node","backend/server.js"]